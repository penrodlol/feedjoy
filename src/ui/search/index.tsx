'use client';

import * as Radix from '@radix-ui/react-dialog';
import { SearchIcon, X } from 'lucide-react';
import { useState } from 'react';
import SearchInput from './search-input';
import SearchOutput from './search-output';
import { reset } from './store';

export default function Search() {
  const [open, setOpen] = useState(false);

  return (
    <Radix.Root open={open} onOpenChange={(open) => (setOpen(open), reset())}>
      <Radix.Trigger asChild>
        <button className="group flex items-center gap-2 rounded bg-3 px-2 py-0.5 shadow text-xs">
          <SearchIcon className="w-3 group-hover:stroke-brand" aria-hidden />
          <span className="group-hover:text-brand">search posts</span>
        </button>
      </Radix.Trigger>
      <Radix.Portal>
        <Radix.Overlay className="fixed inset-0 bg-3 bg-opacity-90" />
        <Radix.Content
          className="fixed left-1/2 top-1/2 flex h-[70vh] w-[90vw] max-w-screen-sm -translate-x-1/2
                     -translate-y-1/2 flex-col gap-4 rounded bg-1 px-7 py-3 shadow motion-safe:animate-fade-in"
        >
          <Radix.Title className="text-lg">search posts</Radix.Title>
          <Radix.Close asChild>
            <button className="group absolute right-3 top-3" aria-label="close">
              <X className="h-5 w-5 group-hover:opacity-75" aria-hidden />
            </button>
          </Radix.Close>
          <SearchInput />
          <div className="my-4 overflow-y-auto px-2">
            <SearchOutput onClick={() => setOpen(false)} />
          </div>
        </Radix.Content>
      </Radix.Portal>
    </Radix.Root>
  );
}
