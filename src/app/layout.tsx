import { Anchor, NextAnchor } from '@/ui/anchor';
import { Kaisei_Tokumin, Taviraj } from '@next/font/google';
import { Home } from 'lucide-react';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import 'tailwindcss/tailwind.css';

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
  description: 'a minimal rss feed congregator',
  icons: { shortcut: '/favicon.svg' },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${taviraj.variable} ${kaisei.variable}`}>
      <body
        className={`mx-auto flex min-h-screen max-w-screen-lg flex-col
                  bg-1 px-fluid-4 text-1 text-base selection:bg-brand 
                  selection:text-black`}
      >
        <header
          className={`m-4 mx-auto flex w-full max-w-screen-sm items-center
                      justify-between rounded bg-2 px-4 py-2 shadow`}
        >
          <NextAnchor href="/" aria-label="Home">
            <Home className="h-5 w-5" aria-hidden />
          </NextAnchor>
          <nav>
            <ul className="flex gap-6 text-sm">
              <li>
                <NextAnchor href="/page/1">posts</NextAnchor>
              </li>
              <li>
                <NextAnchor href="/sites/page/1">sites</NextAnchor>
              </li>
              <li>
                <NextAnchor href="/about">about</NextAnchor>
              </li>
            </ul>
          </nav>
        </header>
        <main className="flex-1 pb-fluid-4 motion-safe:animate-fade-in">
          {children}
        </main>
        <footer className="p-2 text-center text-2 text-sm">
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
