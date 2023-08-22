import { Anchor, NextAnchor } from '@/ui/anchor';
import Separator from '@/ui/separator';
import { GithubIcon } from 'lucide-react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
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
            <div className="flex justify-between px-8 text-xs">
              <NextAnchor href="/" />
              <nav>
                {/* prettier-ignore */}
                <ul className="flex gap-4">
                  <li><NextAnchor href="/posts/page/1" className='px-2 py-1'>posts</NextAnchor></li>
                  <li><NextAnchor href="/about" className='px-2 py-1'>about</NextAnchor></li>
                </ul>
              </nav>
            </div>
          </header>
          <main className="mb-16 flex-1">{children}</main>
          <footer className="mx-auto w-full max-w-screen-lg">
            <Separator />
            <div className="flex items-center justify-between px-2 py-4 text-xxs text-2">
              <p>©{new Date().getFullYear()} Christian Penrod - All Rights Reserved</p>
              <div className="flex items-center gap-5">
                <nav>
                  {/* prettier-ignore */}
                  <ul className="flex gap-3">
                    <li><NextAnchor href="/posts/page/1">posts</NextAnchor></li>
                    <li><NextAnchor href="/about">about</NextAnchor></li>
                  </ul>
                </nav>
                <Separator orientation="vertical" className="h-5" />
                <Anchor
                  href="https://github.com/penrodlol/feedjoy"
                  className="rounded border bg-1 p-1 [&_.lucide-arrow-up-right]:hidden"
                >
                  <GithubIcon size={14} aria-label="github" />
                </Anchor>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
