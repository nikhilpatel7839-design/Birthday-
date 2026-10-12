import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function getPublicWebsiteBySlug(slug: string) {
  const supabase = createSupabaseServerClient();
  return supabase
    .from('websites')
    .select('id, slug, title, status, published_at, owner_id, template_id, website_versions(content)')
    .eq('slug', slug)
    .eq('status', 'published')
    .limit(1)
    .single();
}
