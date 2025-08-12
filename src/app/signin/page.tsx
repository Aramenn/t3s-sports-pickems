'use client';
import { useState } from 'react';
import { signIn, signInWithGoogle } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const credential = await signIn(email, password);
      const user = credential.user;
      if (user) {
        const idToken = await user.getIdToken();
        await fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idToken }),
        });
        router.push('/picks');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const credential = await signInWithGoogle();
      const user = credential.user;
      if (user) {
        const idToken = await user.getIdToken();
        await fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idToken }),
        });
        router.push('/picks');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-2 p-2 border" />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-2 p-2 border" />
      <button onClick={handleSignIn} className="bg-red-800 text-white p-2 rounded mb-2">Sign In</button>
      <button onClick={handleGoogleSignIn} className="bg-black text-white p-2 rounded">Sign In with Google</button>
    </div>
  );
}