'use client';

import { createBrowserClient } from '@supabase/ssr'; // Or createClientComponent if using components

export function getSupabaseClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}