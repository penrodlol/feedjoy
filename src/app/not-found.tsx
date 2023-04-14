import { NextAnchor } from '@/ui/anchor';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="mt-fluid-6 flex flex-col items-center gap-2 text-center">
      <h1 className="font-fancy -tracking-[0.1em] text-9xl">404</h1>
      <p className="text-2 text-2xl">page not found</p>
      <NextAnchor href="/" className="mt-fluid-4">
        <ArrowLeft aria-hidden /> go to home
      </NextAnchor>
    </div>
  );
}
