import Link from 'next/link';
import './globals.css'; // If you have global styles
// Import Header if separate: import Header from '../components/Header';

export const metadata = {
  title: "T3's Sports Pickems",
  description: 'College football picks app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="bg-black text-white p-4">
          <Link href="/" className="text-2xl font-bold">
            T3's Sports Pickems
          </Link>
          {/* Add nav links if needed, e.g., Picks, Sign In/Out */}
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}