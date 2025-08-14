import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "T3&apos;s Sports Pickems",
  description: "College football picks app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 text-gray-800 antialiased">
        <header className="bg-red-900 text-white p-6 shadow-md">
          <h1 className="text-3xl font-bold">
            <Link href="/">T3&apos;s Sports Pickems</Link>
          </h1>
        </header>
        <main className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
          {children}
        </main>
        <footer className="mt-8 p-4 bg-gray-200 text-center text-sm text-gray-600">
          &copy; 2025 T3&apos;s Sports Pickems. All rights reserved.
        </footer>
      </body>
    </html>
  );
}