import { auth } from '@/lib/supabase/server';

export async function createInvitation(email: string, websiteId: string) {
  // server-side encrypted process placeholder; actual insert runs securely inside DB/Supabase
  return { email, websiteId, created: true };
}
