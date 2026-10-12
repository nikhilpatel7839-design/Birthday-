'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { websiteContentSchema, updateWebsiteSchema } from '@/lib/schema/website';

const getSupabase = () => {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        }
      }
    }
  );
};

export async function saveDraft(websiteId: string, content: unknown) {
  try {
    const validated = websiteContentSchema.parse(content);
    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error('Unauthorized');

    // Verify ownership via RLS
    const { data: website, error: checkError } = await supabase
      .from('websites')
      .select('id, owner_id')
      .eq('id', websiteId)
      .single();

    if (checkError || !website || website.owner_id !== user.id) {
      throw new Error('Access denied');
    }

    const { error } = await supabase
      .from('website_versions')
      .upsert(
        {
          website_id: websiteId,
          kind: 'draft',
          content: validated,
          version: 1
        },
        { onConflict: 'website_id,kind' }
      );

    if (error) throw error;
    return { success: true };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export async function publishWebsite(websiteId: string, content: unknown) {
  try {
    const validated = websiteContentSchema.parse(content);
    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error('Unauthorized');

    // Verify admin role or ownership
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    const { data: website } = await supabase.from('websites').select('owner_id').eq('id', websiteId).single();

    const isOwner = website?.owner_id === user.id;
    const isAdmin = profile?.role === 'admin';

    if (!isOwner && !isAdmin) throw new Error('Access denied');

    // Call the secure publish function
    const { error } = await supabase.rpc('publish_website', {
      p_website_id: websiteId,
      p_content: validated
    });

    if (error) throw error;
    return { success: true };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export async function getWebsitesByOwner(userId: string) {
  try {
    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error('Unauthorized');

    const { data, error } = await supabase
      .from('websites')
      .select('id, title, slug, status, created_at, published_at')
      .eq('owner_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: String(error), data: [] };
  }
}

export async function getPublishedWebsite(slug: string) {
  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll() {
            return cookies().getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => cookies().set(name, value, options));
          }
        }
      }
    );

    const { data: website, error: websiteError } = await supabase
      .from('websites')
      .select('id, title, slug, status')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (websiteError || !website) throw new Error('Website not found');

    // Fetch published version only
    const { data: version, error: versionError } = await supabase
      .from('website_versions')
      .select('content')
      .eq('website_id', website.id)
      .eq('kind', 'published')
      .single();

    if (versionError || !version) throw new Error('Published content not found');

    return { success: true, data: { website, content: version.content } };
  } catch (error) {
    return { success: false, error: String(error), data: null };
  }
}
