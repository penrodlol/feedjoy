import { Anchor, NextAnchor } from '@/ui/anchor';
import Separator from '@/ui/separator';
import { GithubIcon, HomeIcon } from 'lucide-react';
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
    <html
      lang="en"
      className={twJoin(
        inter.variable,
        'ml-[calc(100vw-100%)] bg-1 bg-grid text-1 antialiased selection:bg-2',
        'scrollbar-thumb-scrollbar scrollbar-thin scrollbar-track-transparent scrollbar-thumb-rounded',
      )}
    >
      <body className="m-4 text-base">
        <div className="mx-auto max-w-screen-xl rounded bg-gradient p-px">
          <div className="flex min-h-[calc(100vh-2.125rem)] flex-col rounded bg-black px-6 py-1">
            <header className="flex flex-col gap-3 p-3">
              <div className="flex justify-between text-xs">
                <NextAnchor href="/" aria-label="home" className="rounded border bg-1 p-1 text-2">
                  <HomeIcon size={16} aria-hidden />
                </NextAnchor>
                <nav>
                  {/* prettier-ignore */}
                  <ul className="flex gap-6">
                  <li><NextAnchor href="/posts/page/1">posts</NextAnchor></li>
                  <li><NextAnchor href="/about">about</NextAnchor></li>
                </ul>
                </nav>
              </div>
            </header>
            <main className="mb-fluid-6 flex-1">{children}</main>
            <footer className="mx-auto w-full max-w-screen-lg">
              <Separator />
              <div className="flex flex-col-reverse gap-4 px-2 py-4 text-xxs text-2 sm:flex-row sm:items-center sm:justify-between">
                <p>©{new Date().getFullYear()} Christian Penrod - All Rights Reserved</p>
                <div className="flex items-center justify-between gap-5">
                  <nav>
                    {/* prettier-ignore */}
                    <ul className="flex gap-3">
                      <li><NextAnchor href="/">home</NextAnchor></li>
                      <li><NextAnchor href="/posts/page/1">posts</NextAnchor></li>
                      <li><NextAnchor href="/about">about</NextAnchor></li>
                    </ul>
                  </nav>
                  <Separator orientation="vertical" className="hidden h-5 sm:block" />
                  <Anchor
                    href="https://github.com/penrodlol/feedjoy"
                    aria-label="github"
                    className="rounded border bg-1 p-1 [&_[data-external-icon]]:hidden"
                  >
                    <GithubIcon size={14} aria-hidden />
                  </Anchor>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
