import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function saveWebsiteDraft(websiteId: string, content: unknown) {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('website_versions')
    .upsert({
      website_id: websiteId,
      kind: 'draft',
      content,
      version: 1,
      created_at: new Date().toISOString()
    }, { onConflict: 'website_id,kind' });

  if (error) throw error;
  return data;
}

export async function publishWebsite(websiteId: string, content: unknown) {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.rpc('publish_website', {
    p_website_id: websiteId,
    p_content: content
  });

  if (error) throw error;
  return data;
}
