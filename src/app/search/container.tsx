'use client';

import { datetimeFrmt } from '@/const/formatters';
import Card from '@/ui/card';
import { Loader2, SearchIcon, User, X } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { searchPosts, type SearchPosts } from './action';

type SearchStatus = 'idle' | 'loading' | 'empty' | 'success';

export default function SearchContainer({ children }: { children: ReactNode }) {
  const [currentInput, setCurrentInput] = useState<string>();
  const [previousInput, setPreviousInput] = useState<string>();
  const [status, setStatus] = useState<SearchStatus>('idle');
  const [posts, setPosts] = useState<SearchPosts>();

  return (
    <>
      <form
        className="relative flex items-center gap-2 rounded bg-3 shadow"
        onReset={() => (
          setPreviousInput(undefined),
          setCurrentInput(undefined),
          setPosts(undefined),
          setStatus('idle')
        )}
        action={async (formData) => {
          const _currentInput = currentInput?.trim();
          if (!_currentInput || _currentInput === previousInput) return;

          setStatus('loading');
          setPreviousInput(_currentInput);
          const posts = await searchPosts(formData);
          setPosts(posts);
          setStatus(posts?.length ? 'success' : 'empty');
        }}
      >
        <SearchIcon className="absolute left-3 h-3 w-3" aria-hidden />
        <input
          type="text"
          name="query"
          autoComplete="off"
          spellCheck="false"
          className="flex-1 bg-transparent px-8 py-1 placeholder:text-2 focus:outline-none"
          placeholder="post title or summary"
          aria-label="search posts by title or summary"
          disabled={status === 'loading'}
          onInput={(event) => setCurrentInput(event.currentTarget.value)}
        />
        {!!currentInput?.length && (
          <button
            className="group absolute right-0 p-1 motion-safe:animate-fade-in"
            aria-label="clear"
            type="reset"
          >
            <X className="h-4 group-hover:opacity-75" aria-hidden />
          </button>
        )}
      </form>
      <div className="my-4 flex-1 overflow-y-auto px-1">
        {status === 'loading' && <Loading />}
        {status === 'empty' && <Empty />}
        {status === 'idle' && children}
        <ul className="flex flex-col gap-4">
          {posts?.map((post) => (
            <li key={post.slug}>
              <Card
                title={post.title}
                href={`/sites/${post.site.slug}/${post.slug}`}
              >
                <p className="flex items-center gap-2">
                  <User className="h-4 w-4 shrink-0" />
                  <span>{post.site.name}</span>
                </p>
                <time dateTime={new Date(post.pub_date).toISOString()}>
                  {datetimeFrmt.format(new Date(post.pub_date))}
                </time>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function Loading() {
  return (
    <div className="mt-16 flex flex-col items-center gap-2 text-center">
      <Loader2 className="h-10 w-10 motion-safe:animate-spin" aria-hidden />
      <p className="text-lg">searching posts...</p>
    </div>
  );
}

function Empty() {
  return (
    <div className="mx-auto mt-16 max-w-max text-center">
      <p className="text-xl">no posts found</p>
      <p className="max-w-[40ch] text-2 text-sm">try adjusting your search</p>
    </div>
  );
}
