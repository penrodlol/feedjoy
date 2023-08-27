import { NextAnchor } from '@/ui/anchor';
import Button from '@/ui/button';
import { ArrowLeftIcon } from 'lucide-react';

export default function Page() {
  return (
    <div className="mt-fluid-6 text-center">
      <h1 className="text-9xl tracking-widest text-fancy">404</h1>
      <p className="text-xl text-2">page not found</p>
      <Button asChild>
        <NextAnchor href="/" className="mt-fluid-4 gap-3 text-xs">
          <ArrowLeftIcon size={16} aria-hidden /> go back home
        </NextAnchor>
      </Button>
    </div>
  );
}
