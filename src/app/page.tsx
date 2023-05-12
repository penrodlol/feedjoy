import { datetimeFrmt, numberFrmt } from '@/const/formatters';
import supabase from '@/lib/supabase';
import { NextAnchor } from '@/ui/anchor';
import Card from '@/ui/card';
import * as Tabs from '@/ui/tabs';
import { ArrowRight, User } from 'lucide-react';

export const revalidate = 28800;

async function getData() {
  const { data: root } = await supabase.rpc('get_summary');
  const { data: recentPosts } = await supabase.rpc('get_recent_posts');
  const { data: randomPosts } = await supabase.rpc('get_random_posts');
  return { root, recentPosts, randomPosts };
}

export default async function Home() {
  const { root, randomPosts, recentPosts } = await getData();

  return (
    <div className="mx-auto my-fluid-4 flex max-w-screen-md flex-col gap-fluid-5">
      <section>
        <h1 className="mb-4 font-fancy -tracking-[0.1em] text-7xl">feedjoy</h1>
        <p className="mb-fluid-4 text-2 text-lg">
          a minimal rss feed aggregator
        </p>
        <ul className="flex max-w-max items-center gap-fluid-4 overflow-x-auto pb-1 text-base">
          <li className="flex shrink-0 flex-col gap-x-3 sm:flex-row sm:items-center">
            <span className="text-2">total posts:</span>
            <span>{numberFrmt.format(root?.totalposts ?? 0)}</span>
          </li>
          <li className="flex shrink-0 flex-col gap-x-3 sm:flex-row sm:items-center">
            <span className="text-2">total sites:</span>
            <span>{numberFrmt.format(root?.totalsites ?? 0)}</span>
          </li>
          <li className="flex shrink-0 flex-col gap-x-3 sm:flex-row sm:items-center">
            <span className="text-2">posts this week:</span>
            <span>{numberFrmt.format(root?.postweek ?? 0)}</span>
          </li>
        </ul>
      </section>
      <section className="flex flex-col gap-2">
        <Tabs.Root defaultValue="recent posts">
          <Tabs.Triggers>
            <Tabs.Trigger value="recent posts">recent posts</Tabs.Trigger>
            <Tabs.Trigger value="discover">discover</Tabs.Trigger>
          </Tabs.Triggers>
          <Tabs.Content value="recent posts">
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {recentPosts?.map((post) => (
                <li key={post.slug}>
                  <Card
                    href={`/sites/${post.siteslug}/${post.slug}`}
                    title={post.title}
                  >
                    <p className="flex items-center gap-2">
                      <User className="h-4 w-4 shrink-0" aria-hidden />
                      <span>{post.sitename}</span>
                    </p>
                    <time dateTime={new Date(post.pub_date).toISOString()}>
                      {datetimeFrmt.format(new Date(post.pub_date))}
                    </time>
                  </Card>
                </li>
              ))}
            </ul>
          </Tabs.Content>
          <Tabs.Content value="discover">
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {randomPosts?.map((post) => (
                <li key={post.slug}>
                  <Card
                    href={`/sites/${post.siteslug}/${post.slug}`}
                    title={post.title}
                  >
                    <p className="flex items-center gap-2">
                      <User className="h-4 w-4 shrink-0" aria-hidden />
                      <span>{post.sitename}</span>
                    </p>
                    <time dateTime={new Date(post.pub_date).toISOString()}>
                      {datetimeFrmt.format(new Date(post.pub_date))}
                    </time>
                  </Card>
                </li>
              ))}
            </ul>
          </Tabs.Content>
        </Tabs.Root>
        <NextAnchor className="mt-4 self-end" href="/page/1">
          read all posts
          <ArrowRight className="h-5 w-5" aria-hidden />
        </NextAnchor>
      </section>
    </div>
  );
}
