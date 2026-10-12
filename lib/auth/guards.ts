import { createSupabaseServerClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function requireUser() {
  const supabase = createSupabaseServerClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/login');
  }

  return user;
}

export async function requireRole(role: 'admin' | 'customer') {
  const user = await requireUser();
  const supabase = createSupabaseServerClient();
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role !== role) {
    redirect('/dashboard');
  }

  return profile;
}

export async function requireAdmin() {
  return requireRole('admin');
}
