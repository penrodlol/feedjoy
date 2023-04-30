'use client';

import { Search, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { reset, search } from './store';

export default function SearchInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState<string | undefined>(undefined);
  const [lastSubmit, setLastSubmit] = useState<string | undefined>(undefined);

  return (
    <form
      className="relative flex items-center gap-2 rounded bg-3 shadow text-sm"
      onReset={() => (reset(), setLastSubmit(undefined), setInput(undefined))}
      onSubmit={async (e) => {
        e.preventDefault();

        const input = inputRef.current?.value.trim();
        if (!input?.length || lastSubmit === input) return;

        setLastSubmit(input);
        await search(new FormData(e.currentTarget));

        if (inputRef.current) inputRef.current.value = input;
      }}
    >
      <Search className="absolute left-3 h-3 w-3" aria-hidden />
      <input
        ref={inputRef}
        type="text"
        name="query"
        autoComplete="off"
        spellCheck="false"
        className="flex-1 bg-transparent px-8 py-1 placeholder:text-2 focus:outline-none"
        placeholder="post title or summary"
        aria-label="search posts by title or summary"
        onInput={(e) => setInput(e.currentTarget.value)}
      />
      {!!input?.length && (
        <button
          className="group absolute right-0 p-1 motion-safe:animate-fade-in"
          aria-label="clear"
          type="reset"
        >
          <X className="h-4 group-hover:opacity-75" aria-hidden />
        </button>
      )}
    </form>
  );
}
