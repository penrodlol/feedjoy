import { formatDate } from '@/lib/formatter';
import supabase, { type Enums } from '@/lib/supabase';
import { NextAnchor } from '@/ui/anchor';
import Button from '@/ui/button';
import * as Card from '@/ui/card';
import Separator from '@/ui/separator';
import * as Tabs from '@/ui/tabs';
import { ActivityIcon, ArrowRightIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 28800;

async function getData() {
  const totals = await supabase.rpc('summary_totals_ordered').select('type, total, updated_at');
  if (totals.error) return undefined;

  const topics = await supabase.rpc('summary_topics_ordered').select('type, items');
  if (topics.error) return undefined;

  const recentPosts = await supabase
    .from('post')
    .select('slug, title, pub_date, site!inner(id, slug, name)')
    .order('pub_date', { ascending: false })
    .limit(8);
  if (recentPosts.error) return undefined;

  return { summary: { totals: totals.data, topics: topics.data }, recentPosts: recentPosts.data };
}

export default async function Home() {
  const data = await getData();

  return (
    <div className="mx-auto mt-fluid-6 flex max-w-screen-lg flex-col gap-fluid-4">
      <section>
        <h1 className="text-8xl tracking-widest text-fancy">FEEDJOY</h1>
        <h2 className="text-lg tracking-wider text-2">a minimal RSS feed aggregator</h2>
        <p className="mb-8 mt-4 max-w-prose text-xs leading-8 text-2">
          feedjoy aggregates blog posts from multiple RSS feeds into a single source. Its goal is to
          provide a more efficient way of tracking new posts without needing to subscribe to
          multiple newsletters.
        </p>
        <Button asChild>
          <Link href="/posts/page/1" className="text-sm">
            explore posts <ArrowRightIcon size={14} aria-hidden />
          </Link>
        </Button>
      </section>
      <Separator />
      <section className="grid gap-x-fluid-5 gap-y-10 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h3 className="leading-none tracking-wider text-2">SUMMARY</h3>
          <ul className="flex flex-col gap-4">
            {data?.summary.totals.map(({ type, total, updated_at }) => (
              <li key={type} className="rounded bg-gradient p-px">
                <div className="flex flex-col rounded bg-black px-5 py-2.5">
                  <div className="flex justify-between">
                    <span className="mb-1 text-xs">{type}</span>
                    <ActivityIcon size={16} className="text-2" aria-hidden />
                  </div>
                  <strong>{total}</strong>
                  <em className="flex gap-1 text-xxs text-2">
                    <span>last updated:</span>
                    <time dateTime={updated_at}>{formatDate(updated_at)}</time>
                  </em>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="leading-none tracking-wider text-2">POPULAR TOPICS</h3>
          <Tabs.Root defaultValue={'all time' satisfies Enums<'summary_topic_type'>}>
            <Tabs.List className="text-xs">
              {data?.summary.topics.map(({ type }) => (
                <Tabs.Trigger key={type} value={type}>
                  {type}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
            {data?.summary.topics.map(({ type, items }) => (
              <Tabs.Content key={type} value={type}>
                <ul className="flex flex-col gap-1 text-xs">
                  {items.map(({ topic, total }, index) => (
                    <li key={topic} className="flex flex-col gap-1">
                      <div className="flex justify-between">
                        <span>{topic}</span>
                        <p className="flex items-center gap-1">
                          <strong>{total}</strong>
                          <span className="text-2">posts</span>
                        </p>
                      </div>
                      {index !== 7 && <Separator />}
                    </li>
                  ))}
                </ul>
              </Tabs.Content>
            ))}
          </Tabs.Root>
        </div>
      </section>
      <Separator />
      <section className="flex flex-col gap-6">
        <h3 className="text-lg tracking-wider text-2">RECENT POSTS</h3>
        <ul className="grid gap-6 md:grid-cols-2">
          {data?.recentPosts?.map((post) => (
            <li key={post.slug}>
              <Card.Root href={`/posts/${post.slug}`}>
                <Card.Header>
                  <p className="flex items-center gap-2">
                    <UserIcon size={14} aria-hidden /> {post.site?.name}
                  </p>
                  <time dateTime={new Date(post.pub_date).toISOString()}>
                    {formatDate(post.pub_date)}
                  </time>
                </Card.Header>
                <Card.Body>{post.title}</Card.Body>
              </Card.Root>
            </li>
          ))}
        </ul>
        <NextAnchor href="/posts/page/1" className="mt-4 self-end text-xs">
          view all posts <ArrowRightIcon size={14} aria-hidden />
        </NextAnchor>
      </section>
    </div>
  );
}
