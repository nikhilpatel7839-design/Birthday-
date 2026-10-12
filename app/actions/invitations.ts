'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import crypto from 'crypto';

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

export async function inviteCustomer(
  websiteId: string,
  email: string,
  message?: string
) {
  try {
    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error('Unauthorized');

    // Verify admin role or website ownership
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    const { data: website } = await supabase.from('websites').select('owner_id').eq('id', websiteId).single();

    const isOwner = website?.owner_id === user.id;
    const isAdmin = profile?.role === 'admin';

    if (!isOwner && !isAdmin) throw new Error('Access denied');

    // Generate secure token
    const token = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    // Create invitation
    const { data: invitation, error } = await supabase
      .from('website_invitations')
      .insert({
        website_id: websiteId,
        invited_email: email,
        token_hash: tokenHash,
        expires_at: expiresAt.toISOString(),
        status: 'pending'
      })
      .select()
      .single();

    if (error) throw error;

    // Log audit event
    await supabase.from('audit_logs').insert({
      actor_id: user.id,
      website_id: websiteId,
      action: 'invite_customer',
      details: { invited_email: email, message }
    });

    return { success: true, data: { invitationId: invitation.id, token } };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export async function revokeInvitation(invitationId: string, websiteId: string) {
  try {
    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error('Unauthorized');

    // Verify admin role or website ownership
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    const { data: website } = await supabase.from('websites').select('owner_id').eq('id', websiteId).single();

    const isOwner = website?.owner_id === user.id;
    const isAdmin = profile?.role === 'admin';

    if (!isOwner && !isAdmin) throw new Error('Access denied');

    const { error } = await supabase
      .from('website_invitations')
      .update({ status: 'revoked' })
      .eq('id', invitationId)
      .eq('website_id', websiteId);

    if (error) throw error;

    // Log audit event
    await supabase.from('audit_logs').insert({
      actor_id: user.id,
      website_id: websiteId,
      action: 'revoke_invitation',
      details: { invitationId }
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}
