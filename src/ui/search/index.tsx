'use client';

import * as Radix from '@radix-ui/react-dialog';
import { CommandIcon, SearchIcon, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState, type ReactNode } from 'react';
import SearchInput from './search-input';
import SearchOutput from './search-output';
import { reset } from './store';

export default function Search({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'k' && e.metaKey) {
        e.preventDefault();
        setOpen(true);
      }
    });
  }, []);

  return (
    <Radix.Root open={open} onOpenChange={(open) => (setOpen(open), reset())}>
      <Radix.Trigger asChild>
        <button className="group flex select-none items-center gap-2 rounded bg-3 px-2 py-0.5 shadow text-xs">
          <SearchIcon className="w-4 group-hover:stroke-brand" aria-hidden />
          <span className="hidden group-hover:text-brand sm:block">
            search posts
          </span>
          <div className="hidden items-center gap-1 rounded bg-1 px-1 sm:flex">
            <CommandIcon className="h-3 w-3" aria-hidden />
            <kbd className="translate-y-[1px]">K</kbd>
          </div>
        </button>
      </Radix.Trigger>
      <Radix.Portal>
        <Radix.Overlay className="fixed inset-0 backdrop-blur-sm" />
        <Radix.Content
          className="fixed left-1/2 top-1/2 flex h-[90vh] w-[90vw] max-w-screen-sm -translate-x-1/2
                     -translate-y-1/2 flex-col gap-4 rounded border-2 border-brand border-opacity-25
                     bg-1 px-5 py-3 shadow motion-safe:animate-fade-in md:h-[70vh]"
        >
          <Radix.Title className="text-lg">search posts</Radix.Title>
          <Radix.Close asChild>
            <button className="group absolute right-3 top-3" aria-label="close">
              <X className="h-5 w-5 group-hover:opacity-75" aria-hidden />
            </button>
          </Radix.Close>
          <SearchInput />
          <div className="my-4 flex-1 overflow-y-auto px-1">
            <SearchOutput>{children}</SearchOutput>
          </div>
        </Radix.Content>
      </Radix.Portal>
    </Radix.Root>
  );
}
