import { slugSchema } from '@/const/schemas';
import supabase, { type Site } from '@/lib/supabase';
import { Anchor } from '@/ui/anchor';
import Breadcrumbs from '@/ui/breadcrumbs';
import Datetime from '@/ui/datetime';
import { Calendar, User } from 'lucide-react';
import { redirect } from 'next/navigation';
import { z } from 'zod';

type Props = { params: { site: string; post: string } };

const schema = z.object({ site: slugSchema, post: slugSchema });

async function getPost(props: z.infer<typeof schema>) {
  const { data, error } = await supabase
    .from('post')
    .select('*, site (*)')
    .eq('site.slug', props.site)
    .eq('slug', props.post)
    .single();
  if (error) return undefined;

  return { ...data, site: data.site as Site };
}

export const revalidate = 86400;

export default async function Post(props: Props) {
  const params = schema.safeParse(props.params);
  if (!params.success) redirect('/sites/page/1');

  const post = await getPost(params.data);
  if (!post) redirect('/sites/page/1');

  return (
    <div className="mx-auto mt-fluid-4 flex max-w-screen-sm flex-col gap-fluid-1">
      <Breadcrumbs
        routes={[
          { href: '/sites/page/1', name: 'sites' },
          { href: `/sites/${post.site.slug}/page/1`, name: post.site.name },
        ]}
      />
      <section>
        <h1 className="mb-3 text-2xl">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-10 text-2 text-sm">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5" aria-hidden />
            <span>{post.site.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" aria-hidden />
            <Datetime>{post.pub_date}</Datetime>
          </div>
        </div>
        <div className="my-5 h-1.5 rounded bg-2"></div>
        <p className="mb-6 !leading-relaxed text-sm">{post.summary}</p>
        <div className="flex justify-end">
          <Anchor href={post.link}>Read Post</Anchor>
        </div>
      </section>
    </div>
  );
}
