'use client';

import { datetimeFrmt } from '@/const/formatters';
import { useStore } from '@nanostores/react';
import { Loader2, User } from 'lucide-react';
import Card from '../card';
import { store } from './store';

export default function SearchOutput(props: { onClick: () => void }) {
  const $store = useStore(store);

  switch ($store.status) {
    case 'pristine':
      return <Pristine />;
    case 'loading':
      return <Loading />;
    case 'empty':
      return <Empty />;
    case 'error':
      return <Error />;
    default:
      return (
        <ul className="flex flex-col gap-4">
          {$store.posts.map((post) => (
            <li key={post.slug}>
              <Card
                title={post.title}
                href={`/sites/${post.site.slug}/${post.slug}`}
                onClick={() => props.onClick()}
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

function Pristine() {
  return (
    <div className="mx-auto mt-24 max-w-max">
      <p className="text-xl">discover posts accross sites</p>
      <p className="max-w-[40ch] text-2 text-sm">
        query a post title or summary in the search bar above to begin
      </p>
    </div>
  );
}

function Loading() {
  return (
    <div className="mt-24 flex flex-col items-center gap-2 text-center">
      <Loader2 className="h-10 w-10 motion-safe:animate-spin" aria-hidden />
      <p className="text-xl">searching posts...</p>
    </div>
  );
}

function Empty() {
  return (
    <div className="mx-auto mt-24 max-w-max text-center">
      <p className="text-xl">no posts found</p>
      <p className="max-w-[40ch] text-2 text-sm">try adjusting your query</p>
    </div>
  );
}

function Error() {
  return (
    <div className="mx-auto mt-24 max-w-max text-center">
      <p className="text-xl">something went wrong</p>
      <p className="max-w-[40ch] text-2 text-sm">
        please try again in a few minutes
      </p>
    </div>
  );
}
