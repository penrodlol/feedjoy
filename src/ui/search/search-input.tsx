'use client';

import { Search } from 'lucide-react';
import { useRef, useState } from 'react';
import Button from '../button';
import { reset, search } from './store';

export default function SearchInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [lastQuery, setLastQuery] = useState<string | undefined>(undefined);
  const [disabled, setDisabled] = useState(true);

  return (
    <form
      className="flex items-center gap-2 text-sm"
      onReset={() => (reset(), setLastQuery(undefined), setDisabled(true))}
      onSubmit={async (e) => {
        e.preventDefault();

        const query = inputRef.current?.value.trim();
        if (!query?.length || lastQuery === query) return;

        setLastQuery(query);
        await search(new FormData(e.currentTarget));
      }}
    >
      <div className="flex flex-1 items-center rounded bg-3 shadow">
        <Search className="my-1 ml-2 mr-2 h-4 w-4" aria-hidden />
        <input
          ref={inputRef}
          type="text"
          name="query"
          autoFocus
          autoComplete="off"
          className="flex-1 bg-transparent py-1 pr-2 placeholder:text-2 focus:outline-none"
          placeholder="post title or summary"
          aria-label="search posts by title or summary"
          onChange={(e) => setDisabled(!e.currentTarget.value.trim().length)}
        />
      </div>
      <Button type="submit" disabled={disabled}>
        search
      </Button>
      <Button variant="outline" type="reset" disabled={disabled}>
        clear
      </Button>
    </form>
  );
}
