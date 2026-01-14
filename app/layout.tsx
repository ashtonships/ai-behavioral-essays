import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ashton MacDonald",
  description: "Essays on AI behavioral systems, constraint engineering, and evaluation frameworks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen">
          <header className="border-b border-zinc-800">
            <nav className="max-w-2xl mx-auto px-6 py-6 flex justify-between items-center">
              <Link
                href="/"
                className="text-zinc-100 font-medium hover:text-zinc-300 transition-colors"
              >
                Ashton MacDonald
              </Link>
              <a
                href="https://github.com/xCotion/ai-behavioral-essays"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-zinc-100 transition-colors text-sm"
              >
                GitHub
              </a>
            </nav>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
