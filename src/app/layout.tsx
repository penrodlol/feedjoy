import { Anchor, NextAnchor } from '@/ui/anchor';
import { Home } from 'lucide-react';
import type { Metadata } from 'next';
import { Kaisei_Tokumin, Taviraj } from 'next/font/google';
import type { ReactNode } from 'react';
import 'tailwindcss/tailwind.css';
import Search from './search';

const taviraj = Taviraj({
  weight: ['400', '700'],
  variable: '--font-taviraj',
  display: 'swap',
  subsets: ['latin'],
});

const kaisei = Kaisei_Tokumin({
  weight: ['500'],
  variable: '--font-kaisei',
  display: 'swap',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'feedjoy',
  description: 'a minimal rss feed aggregator',
  icons: { shortcut: '/favicon.svg' },
  creator: 'christian penrod',
  publisher: 'christian penrod',
  keywords: 'rss, nextjs, openai, tailwindcss, supabase',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
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
    <html
      lang="en"
      className={`ml-[calc(100vw-100%)] ${taviraj.variable} ${kaisei.variable}`}
    >
      <body
        className="!mx-auto flex min-h-screen max-w-screen-lg flex-col bg-1 px-fluid-4 
                   text-1 text-sm selection:bg-brand selection:text-black"
      >
        <div className="mx-auto my-4 flex w-full items-center gap-fluid-2 rounded bg-2 px-4 py-2 shadow">
          <NextAnchor href="/" className="mr-auto" aria-label="Home">
            <Home className="h-5 w-5" aria-hidden />
          </NextAnchor>
          <nav>
            {/* prettier-ignore */}
            <ul className="flex gap-5">
              <li><NextAnchor href="/page/1">posts</NextAnchor></li>
              <li><NextAnchor href="/sites/page/1">sites</NextAnchor></li>
              <li><NextAnchor href="/about">about</NextAnchor></li>
            </ul>
          </nav>
          {/* @ts-expect-error Async Server Component */}
          <Search />
        </div>
        <main className="flex-1 pb-fluid-4 motion-safe:animate-fade-in">
          {children}
        </main>
        <footer className="p-2 text-center text-2 text-xs">
          <p>christian penrod ©{new Date().getUTCFullYear()}</p>
          <p>
            source code:{' '}
            <Anchor href="https://github.com/penrodlol/feedjoy">github</Anchor>
          </p>
        </footer>
      </body>
    </html>
  );
}
