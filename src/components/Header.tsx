'use client';
import { useAuth } from '@/context/AuthContext';
import { signOut } from '@/lib/firebase';
import Link from 'next/link';

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="bg-black text-light-grey p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">T3’s Sports Pickems</Link>
      <nav className="space-x-4">
        <Link href="/picks">Picks</Link>
        {user ? (
          <button onClick={signOut} className="hover:text-dark-red">Sign Out</button>
        ) : (
          <>
            <Link href="/signin" className="hover:text-dark-red">Sign In</Link>
            <Link href="/signup" className="hover:text-dark-red">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
}