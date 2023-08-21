import { formatDate } from '@/lib/formatter';
import supabase from '@/lib/supabase';
import { NextAnchor } from '@/ui/anchor';
import Button from '@/ui/button';
import * as Card from '@/ui/card';
import Separator from '@/ui/separator';
import { ArrowRightIcon, UserIcon } from 'lucide-react';
import Summary from './summary';
import Topics from './topics';

export const revalidate = 28800;

async function getData() {
  const summary = await supabase.rpc('get_summary');
  if (summary.error) return undefined;

  const topics = await supabase.rpc('get_top_topics', { pub_date_limit: '1 year' });
  if (topics.error) return undefined;

  const recentPosts = await supabase
    .from('post')
    .select('slug, title, pub_date, site!inner(id, slug, name)')
    .order('pub_date', { ascending: false })
    .limit(8);
  if (recentPosts.error) return undefined;

  return { summary: summary.data, topics: topics.data, recentPosts: recentPosts.data };
}

export default async function Home() {
  const data = await getData();

  return (
    <div className="mx-auto mt-fluid-6 flex max-w-screen-lg flex-col gap-fluid-4">
      <section>
        <h1 className="text-8xl tracking-widest text-fancy">FEEDJOY</h1>
        <h2 className="mb-4 text-lg tracking-wider text-2">a minimal RSS feed aggregator</h2>
        <p className="max-w-prose text-xs leading-8 text-2">
          feedjoy aggregates blog posts from multiple RSS feeds into a single source. Its goal is to
          provide a more efficient way of tracking new posts without having to subscribe to multiple
          newsletters.
        </p>
        <Button className="mt-8 text-sm">
          explore posts <ArrowRightIcon size={14} aria-hidden />
        </Button>
      </section>
      <Separator />
      <section className="grid grid-cols-2 gap-20">
        <div className="flex flex-col gap-4">
          <h3 className="leading-none tracking-wider text-2">SUMMARY</h3>
          <Summary summary={data?.summary} />
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="leading-none tracking-wider text-2">POPULAR TOPICS</h3>
          <Topics topics={data?.topics} />
        </div>
      </section>
      <Separator />
      <section className="flex flex-col gap-6">
        <h3 className="text-lg tracking-wider text-2">RECENT POSTS</h3>
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
          view all posts
          <ArrowRightIcon size={14} aria-hidden />
        </NextAnchor>
      </section>
    </div>
  );
}
