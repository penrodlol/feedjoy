import { formatDate } from '@/lib/formatter';
import { slugSchema } from '@/lib/schema';
import supabase from '@/lib/supabase';
import { Anchor } from '@/ui/anchor';
import Separator from '@/ui/separator';
import { CalendarIcon, UserIcon } from 'lucide-react';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export const revalidate = 28800;

async function getPost(slug: string) {
  const { data, error } = await supabase
    .from('post')
    .select('topic, title, pub_date, summary, link, site(name)')
    .eq('slug', slug)
    .single();
  return error ? undefined : data;
}

export default async function Page(props: { params: { post: string } }) {
  const params = z.object({ post: slugSchema }).safeParse(props.params);
  if (!params.success) redirect('/posts/page/1');

  const post = await getPost(params.data.post);
  if (!post) redirect('/posts/page/1');

  return (
    <div className="mx-auto mt-fluid-3 flex max-w-screen-md flex-col gap-fluid-3">
      <section className="flex flex-col gap-3">
        <div className="max-w-max rounded-lg bg-2/80 px-2 py-0.5 !text-xxs">{post.topic}</div>
        <h1 className="text-xl uppercase tracking-widest text-fancy">{post.title}</h1>
        <div className="mt-3 flex flex-wrap gap-12 text-sm">
          <div className="flex items-center gap-2">
            <UserIcon size={16} aria-hidden />
            {post.site?.name}
          </div>
          <div className="flex items-center gap-2">
            <CalendarIcon size={16} aria-hidden />
            <time dateTime={new Date(post.pub_date).toISOString()}>
              {formatDate(post.pub_date)}
            </time>
          </div>
        </div>
      </section>
      <Separator />
      <section className="flex flex-col gap-6">
        <p className="text-xs !leading-8 text-2">{post.summary}</p>
        <Anchor href={post.link} className="self-end text-sm">
          read full post
        </Anchor>
      </section>
    </div>
  );
}
