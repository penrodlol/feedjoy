'use client';

import { useStore } from '@nanostores/react';
import { Search, X } from 'lucide-react';
import { useState } from 'react';
import { reset, search, store } from './store';

export default function SearchForm() {
  const { status, query } = useStore(store);
  const [nextQuery, setNextQuery] = useState<string>();

  return (
    <form
      className="relative flex items-center gap-2 rounded bg-3 shadow"
      onReset={() => (reset(), setNextQuery(undefined))}
      action={async () => {
        const _nextQuery = nextQuery?.trim();
        if (!_nextQuery?.length || _nextQuery === query) return;
        await search(_nextQuery);
      }}
    >
      <Search className="absolute left-3 h-3 w-3" aria-hidden />
      <input
        type="text"
        name="query"
        autoComplete="off"
        spellCheck="false"
        className="flex-1 bg-transparent px-8 py-1 placeholder:text-2
                   focus:outline-none disabled:cursor-not-allowed disabled:opacity-75"
        placeholder="post title or summary"
        aria-label="search posts by title or summary"
        defaultValue={query}
        disabled={status === 'loading'}
        onInput={(event) => setNextQuery(event.currentTarget.value)}
      />
      {(!!nextQuery?.length || !!query?.length) && (
        <button
          className="group absolute right-0 p-1 disabled:cursor-not-allowed
                     disabled:opacity-75 motion-safe:animate-fade-in"
          aria-label="clear"
          type="reset"
          disabled={status === 'loading'}
        >
          <X className="h-4 group-hover:enabled:opacity-75" aria-hidden />
        </button>
      )}
    </form>
  );
}
