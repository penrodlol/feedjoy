'use client';

import { datetimeFrmt } from '@/const/formatters';
import { useStore } from '@nanostores/react';
import { Loader2, User } from 'lucide-react';
import type { ReactNode } from 'react';
import Card from '../card';
import { store, type State } from './store';

export default function SearchOutput({ children }: { children: ReactNode }) {
  const $store = useStore(store);

  switch ($store.status) {
    case 'pristine':
      return <>{children}</>;
    case 'loading':
      return <Loading />;
    case 'empty':
      return <Empty />;
    case 'error':
      return <Error />;
    default:
      return <Posts posts={$store.posts} />;
  }
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

function Error() {
  return (
    <div className="mx-auto mt-16 max-w-max text-center">
      <p className="text-xl">something went wrong</p>
      <p className="max-w-[40ch] text-2 text-sm">
        please try again in a few moments
      </p>
    </div>
  );
}

function Posts(props: { posts: State['posts'] }) {
  return (
    <ul className="flex flex-col gap-4">
      {props.posts.map((post) => (
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
