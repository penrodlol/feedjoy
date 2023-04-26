'use client';

import * as Radix from '@radix-ui/react-dialog';
import { Command, SearchIcon, X } from 'lucide-react';

export default function Search() {
  return (
    <Radix.Root>
      <Radix.Trigger asChild>
        <button className="group flex items-center gap-2 rounded bg-3 px-2 py-0.5 shadow text-xs">
          <SearchIcon className="w-3 group-hover:stroke-brand" aria-hidden />
          <span className="group-hover:text-brand">search posts</span>
          <div className="ml-2 flex items-center gap-1 rounded bg-1 px-2">
            <Command className="h-3 w-3" aria-hidden />
            <kbd className="translate-y-[1px]">K</kbd>
          </div>
        </button>
      </Radix.Trigger>
      <Radix.Portal>
        <Radix.Overlay className="fixed inset-0 bg-3 bg-opacity-75" />
        <Radix.Content
          className="fixed left-1/2 top-1/2 max-h-[70vh] w-[90vw] max-w-screen-sm -translate-x-1/2
                     -translate-y-1/2 rounded bg-1 p-4 shadow motion-safe:animate-fade-in"
        >
          <Radix.Title>search posts</Radix.Title>
          <div></div>
          <Radix.Close asChild>
            <button className="group absolute right-3 top-3" aria-label="close">
              <X className="h-5 w-5 group-hover:opacity-75" aria-hidden />
            </button>
          </Radix.Close>
          <form></form>
        </Radix.Content>
      </Radix.Portal>
    </Radix.Root>
  );
}
