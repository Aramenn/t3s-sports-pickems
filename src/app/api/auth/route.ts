import { NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { auth } from '@/lib/firebase';  // We'll create this file next if not already

export async function POST(request: Request) {
  const { idToken } = await request.json();  // Expect Firebase ID token from client

  try {
    // Verify Firebase ID token server-side
    const decodedToken = await auth.verifyIdToken(idToken);
    const userId = decodedToken.uid;
    const email = decodedToken.email;

    // Sign Supabase JWT with Firebase user data
    const supabaseToken = sign(
      {
        sub: userId,  // Firebase UID as sub (text)
        id: userId,   // Custom claim for auth_user_id()
        email: email, // Custom claim for auth_user_email()
        role: 'authenticated',  // Required for authenticated policies
        aud: 'authenticated',   // Required
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),  // 24-hour expiration
      },
      process.env.SUPABASE_JWT_SECRET!
    );

    // Set cookie with Supabase token
    cookies().set(process.env.SUPABASE_ACCESS_TOKEN_COOKIE!, supabaseToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Auth failed' }, { status: 500 });
  }
}