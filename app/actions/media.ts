'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

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

export async function uploadWebsiteImage(
  websiteId: string,
  file: File,
  altText?: string
) {
  try {
    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error('Unauthorized');

    // Verify ownership
    const { data: website } = await supabase
      .from('websites')
      .select('owner_id')
      .eq('id', websiteId)
      .single();

    if (!website || website.owner_id !== user.id) throw new Error('Access denied');

    // Validate file
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_SIZE) throw new Error('File too large');

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) throw new Error('Invalid file type');

    // Generate unique filename
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(7);
    const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const filename = `${websiteId}/${timestamp}-${random}.${extension}`;

    // Upload to storage
    const { error: uploadError } = await supabase.storage
      .from('website-media')
      .upload(filename, file, {
        contentType: file.type,
        upsert: false
      });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: publicData } = supabase.storage
      .from('website-media')
      .getPublicUrl(filename);

    // Record in database
    const { data: media, error: dbError } = await supabase
      .from('website_media')
      .insert({
        website_id: websiteId,
        storage_path: filename,
        alt_text: altText || '',
        sort_order: 0
      })
      .select()
      .single();

    if (dbError) throw dbError;

    return {
      success: true,
      data: {
        id: media.id,
        url: publicData.publicUrl,
        alt: altText
      }
    };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export async function deleteWebsiteImage(mediaId: string, websiteId: string) {
  try {
    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error('Unauthorized');

    // Verify ownership
    const { data: website } = await supabase
      .from('websites')
      .select('owner_id')
      .eq('id', websiteId)
      .single();

    if (!website || website.owner_id !== user.id) throw new Error('Access denied');

    // Get media record
    const { data: media } = await supabase
      .from('website_media')
      .select('storage_path')
      .eq('id', mediaId)
      .eq('website_id', websiteId)
      .single();

    if (!media) throw new Error('Media not found');

    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('website-media')
      .remove([media.storage_path]);

    if (storageError) throw storageError;

    // Delete from database
    const { error: dbError } = await supabase
      .from('website_media')
      .delete()
      .eq('id', mediaId);

    if (dbError) throw dbError;

    return { success: true };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}
