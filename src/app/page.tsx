import { formatDate } from '@/lib/formatter';
import supabase from '@/lib/supabase';
import { NextAnchor } from '@/ui/anchor';
import * as Card from '@/ui/card';
import Separator from '@/ui/separator';
import { ArrowRightIcon, UserIcon } from 'lucide-react';

export const revalidate = 28800;

async function getData() {
  const recentPosts = await supabase
    .from('post')
    .select('slug, title, pub_date, site!inner(id, slug, name)')
    .order('pub_date', { ascending: false })
    .limit(8);
  return { recentPosts: recentPosts.data };
}

export default async function Home() {
  const data = await getData();

  return (
    <div className="mx-auto mt-fluid-6 flex max-w-screen-lg flex-col gap-fluid-4">
      <section>
        <h1 className="text-8xl uppercase tracking-widest text-fancy">feedjoy</h1>
        <p className="text-lg tracking-wider text-2">a minimal RSS feed aggregator</p>
      </section>
      <Separator />
      <section></section>
      <Separator />
      <section className="flex flex-col gap-6">
        <h2></h2>
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {data.recentPosts?.map((post) => (
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
