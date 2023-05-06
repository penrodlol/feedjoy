import * as Dialog from '@/ui/dialog';
import { SearchIcon } from 'lucide-react';
import SearchContainer from './container';
import SearchHero from './hero';

export default function Search() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <button className="group flex select-none items-center gap-2 rounded bg-3 px-3 py-0.5 shadow text-xs">
          <SearchIcon className="w-3 group-hover:stroke-brand" aria-hidden />
          <span className="hidden group-hover:text-brand sm:block">
            search posts
          </span>
        </button>
      </Dialog.Trigger>
      <Dialog.Content title="search posts">
        <SearchContainer>
          {/* @ts-expect-error Async Server Component */}
          <SearchHero />
        </SearchContainer>
      </Dialog.Content>
    </Dialog.Root>
  );
}
