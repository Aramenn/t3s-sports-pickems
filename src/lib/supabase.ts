import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';  // For server-side


export function getSupabaseClient() {
  const cookieStore = cookies();
  //@ts-ignore
  const token = cookieStore.get(process.env.SUPABASE_ACCESS_TOKEN_COOKIE!)?.value;

  const authHeader = token ? `Bearer ${token}` : '';

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
        // @ts-ignore
        headers: { Authorization: authHeader },
      },
    }
  );
}