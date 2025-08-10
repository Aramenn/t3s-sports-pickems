import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';  // For server-side

export function getSupabaseClient() {
  const cookieStore = cookies();
  const token = cookieStore.get(process.env.SUPABASE_ACCESS_TOKEN_COOKIE!)?.value;

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
      },
      global: {
        headers: { Authorization: token ? `Bearer ${token}` : '' },
      },
    }
  );
}