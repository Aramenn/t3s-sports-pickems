import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header"; // Adjust if needed

export const metadata: Metadata = {
  title: "T3's Sports Pickems",
  description: "College football picks app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white p-4">
        <header className="mb-4">
          <h1 className="text-2xl font-bold">T3's Sports Pickems</h1>
        </header>
        {/* Add nav links if needed, e.g. Picks, Sign In/Out */}
        <main>{children}</main>
      </body>
    </html>
  );
}