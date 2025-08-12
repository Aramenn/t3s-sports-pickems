'use client';
import { useState } from 'react';
import { signUp } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { getSupabaseClient } from '@/lib/supabase';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [favoriteTeam, setFavoriteTeam] = useState('');
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      const credential = await signUp(email, password);
      const user = credential.user;
      if (user) {
        const idToken = await user.getIdToken();
        await fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idToken }),
        });
        const supabase = getSupabaseClient();
        await supabase.from('profiles').insert({
          user_id: user.uid,
          email,
          name,
          username,
          favorite_team: favoriteTeam,
        });
        router.push('/picks');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="mb-2 p-2 border" />
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="mb-2 p-2 border" />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-2 p-2 border" />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-2 p-2 border" />
      <input type="text" placeholder="Favorite Team" value={favoriteTeam} onChange={(e) => setFavoriteTeam(e.target.value)} className="mb-2 p-2 border" />
      <button onClick={handleSignUp} className="bg-red-800 text-white p-2 rounded">Sign Up</button>
    </div>
  );
}