'use client';

import { datetimeFrmt } from '@/const/formatters';
import Card from '@/ui/card';
import { useStore } from '@nanostores/react';
import { Loader2, User } from 'lucide-react';
import type { ReactNode } from 'react';
import { store } from './store';

export default function SearchResults({ children }: { children: ReactNode }) {
  const { status, posts } = useStore(store);

  switch (status) {
    case 'idle':
      return <>{children}</>;
    case 'loading':
      return (
        <div className="mt-10 flex flex-col items-center gap-2 text-center">
          <Loader2 className="h-10 w-10 motion-safe:animate-spin" aria-hidden />
          <p className="text-lg">searching posts...</p>
        </div>
      );
    case 'empty':
      return (
        <div className="mx-auto mt-10 max-w-max text-center">
          <p className="text-xl">no posts found</p>
          <p className="max-w-[40ch] text-2 text-sm">
            try adjusting your search
          </p>
        </div>
      );
    default:
      return (
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
      );
  }
}
