import { createClient } from '@supabase/supabase-js';

/**
 * Klijent za admin sesije — koristi service_role ključ bez Database tipova
 * jer RLS blokira anon pristup tablici admin_sessions.
 * Ovo je jedini klijent koji pristupa admin_sessions tablici.
 */
function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

interface AdminSession {
  token: string;
  expires_at: string;
}

/** Kreiraj novu admin sesiju */
export async function createAdminSession(
  token: string,
  expiresAt: Date
): Promise<{ error: string | null }> {
  const client = getAdminClient();
  const { error } = await client.from('admin_sessions').insert({
    token,
    expires_at: expiresAt.toISOString(),
  });
  return { error: error?.message ?? null };
}

/** Provjeri je li admin sesija valjana */
export async function validateAdminSession(
  token: string
): Promise<boolean> {
  const client = getAdminClient();
  const { data } = await client
    .from('admin_sessions')
    .select('expires_at')
    .eq('token', token)
    .single();

  if (!data) return false;
  const session = data as AdminSession;
  return new Date(session.expires_at) > new Date();
}

/** Obriši admin sesiju */
export async function deleteAdminSession(token: string): Promise<void> {
  const client = getAdminClient();
  await client.from('admin_sessions').delete().eq('token', token);
}
