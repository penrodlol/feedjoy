import { numberFrmt } from '@/const/formatters';
import supabase from '@/lib/supabase';
import { ArrowRight } from 'lucide-react';

export const revalidate = 86400;

async function getRoot() {
  const payload = await supabase.rpc('get_root_summary').single();
  if (payload.error) throw new Error(payload.error.message);
  return payload.data;
}

async function getTopics() {
  const payload = await supabase.rpc('get_random_topics', { amount: 5 });
  if (payload.error) throw new Error(payload.error.message);
  return payload.data;
}

export default async function SearchHero() {
  const [root, topics] = await Promise.all([
    await getRoot(),
    await getTopics(),
  ]);

  return (
    <div className="mx-auto mt-10 flex max-w-max flex-col gap-2">
      <span className="text-fancy -tracking-[0.1em] text-4xl">
        feedjoy search
      </span>
      <p className="text-2 text-base [&>strong]:text-1">
        traverse{' '}
        <span className="text-1">{numberFrmt.format(root.totalposts)}</span>{' '}
        posts on{' '}
        <span className="text-1">{numberFrmt.format(root.totalsites)}</span>{' '}
        sites
      </p>
      <div className="mb-10 h-1 rounded bg-3" />
      <div className="flex flex-col gap-1">
        <p className="text-2">example searches</p>
        <ul className="text-sm">
          {topics.map((topic) => (
            <li key={topic.name} className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              {topic.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
