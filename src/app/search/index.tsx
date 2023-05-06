import { numberFrmt } from '@/const/formatters';
import supabase from '@/lib/supabase';
import * as Dialog from '@/ui/dialog';
import { ArrowRight, SearchIcon } from 'lucide-react';
import SearchForm from './form';
import SearchResults from './results';

async function getRootAndTopics() {
  const root = await supabase.rpc('get_root_summary').single();
  const topics = await supabase.rpc('get_random_topics', { amount: 5 });
  if (root.error || topics.error) return { root: undefined, topics: undefined };
  return { root: root.data, topics: topics.data };
}

export default async function Search() {
  const { root, topics } = await getRootAndTopics();

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
        <SearchForm />
        <div className="my-4 flex-1 overflow-y-auto px-1">
          <SearchResults>
            <div className="mx-auto mt-10 flex max-w-max flex-col gap-2">
              <span className="text-fancy -tracking-[0.1em] text-4xl">
                feedjoy search
              </span>
              <p className="text-2 text-base [&>span]:text-1">
                traverse <span>{numberFrmt.format(root?.totalposts ?? 0)}</span>{' '}
                posts on <span>{numberFrmt.format(root?.totalsites ?? 0)}</span>{' '}
                sites
              </p>
              <div className="mb-10 h-1 rounded bg-3" />
              <div className="flex flex-col gap-1">
                <p className="text-2">example searches</p>
                <ul className="text-sm">
                  {topics?.map((topic) => (
                    <li key={topic.name} className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                      {topic.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </SearchResults>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
