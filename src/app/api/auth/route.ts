import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebaseAdmin';

export async function POST(request: Request) {
  const { idToken } = await request.json();

  try {
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const userId = decodedToken.uid;
    const email = decodedToken.email || '';

    const supabaseToken = jwt.sign(
      {
        sub: userId,
        id: userId,
        email: email,
        role: 'authenticated',
        aud: 'authenticated',
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
      },
      process.env.SUPABASE_JWT_SECRET!
    );

    const cookieName = process.env.SUPABASE_ACCESS_TOKEN_COOKIE;
    if (cookieName) {
      // @ts-ignore -- Ignore TS type error for cookies-next, as types not available
      cookies().set(cookieName, supabaseToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24,
        path: '/',
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Auth failed' }, { status: 500 });
  }
}