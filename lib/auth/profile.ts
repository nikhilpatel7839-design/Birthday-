import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function getProfileForUser(userId: string) {
  const supabase = createSupabaseServerClient();
  return supabase.from('profiles').select('*').eq('id', userId).single();
}

export function canAccessWebsite(ownerId: string, currentUserId: string, isAdmin: boolean) {
  return isAdmin || ownerId === currentUserId;
}
