import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "T3&apos;s Sports Pickems",
  description: "College football picks app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white p-4">
        <header className="mb-4">
          <h1 className="text-2xl font-bold">T3&apos;s Sports Pickems</h1>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}