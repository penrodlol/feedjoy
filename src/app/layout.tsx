import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { twJoin } from 'tailwind-merge';
import 'tailwindcss/tailwind.css';

const inter = Inter({ weight: '400', variable: '--font', display: 'swap', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'feedjoy',
  description: 'a minimal rss feed aggregator',
  icons: { shortcut: '/favicon.svg' },
  creator: 'christian penrod',
  publisher: 'christian penrod',
  keywords: 'rss, nextjs, openai, tailwindcss, supabase',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    title: 'feedjoy',
    description: 'a minimal rss feed aggregator',
    url: `${process.env.SITE}`,
    siteName: 'feedjoy',
    locale: 'en_US',
    type: 'website',
    images: `${process.env.SITE}/og.png`,
  },
  twitter: {
    title: 'feedjoy',
    description: 'a minimal rss feed aggregator',
    card: 'summary_large_image',
    images: `${process.env.SITE}/og.png`,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={twJoin(inter.variable, 'ml-[calc(100vw-100%)] bg-1 bg-grid text-1')}>
      <body className="m-4 mx-auto max-w-screen-xl rounded bg-gradient p-px">
        <div className="flex min-h-screen flex-col rounded bg-black text-base antialiased">
          <header className="flex flex-col gap-3 p-3">
            <div className="flex justify-between px-8">
              <span></span>
              <nav>
                {/* prettier-ignore */}
                <ul className="flex gap-8 text-xs">
                  <li><Link href="/posts/page/1">posts</Link></li>
                  <li><Link href="/about">about</Link></li>
                </ul>
              </nav>
            </div>
          </header>
          <main className="mb-10 flex-1">{children}</main>
          <footer className="p-3">
            <div className="px-8"></div>
          </footer>
        </div>
      </body>
    </html>
  );
}
