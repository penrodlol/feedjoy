import { formatDate } from '@/lib/formatter';
import { pageSchema, stringSchema } from '@/lib/schema';
import supabase from '@/lib/supabase';
import * as Card from '@/ui/card';
import Separator from '@/ui/separator';
import { UserIcon } from 'lucide-react';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import Filter from './filter';
import Search from './search';

export const revalidate = 28800;

async function getData(page: number, post?: string, site?: string) {
  let query = supabase.from('post').select('slug, title, pub_date, site!inner(id, slug, name)');
  if (site) query = query.like('site.name', site);
  if (post) query = query.textSearch('title_topic_summary_fts', `'${post}'`);

  const posts = await query
    .order('pub_date', { ascending: false })
    .range((page - 1) * 30, (page - 1) * 30 + 29);
  if (posts.error) return undefined;

  const sites = await supabase.from('site').select('name').order('name');
  if (sites.error) return undefined;

  return { posts: posts.data, sites: sites.data.map((site) => site.name) };
}

type Params = { page: string };
type SearchParams = { post?: string; site?: string };

export default async function Page(props: { params: Params; searchParams: SearchParams }) {
  const params = z.object({ page: pageSchema }).safeParse(props.params);
  if (!params.success) redirect('/');

  const searchParams = z
    .object({ post: stringSchema.optional(), site: stringSchema.optional() })
    .safeParse(props.searchParams);
  if (!searchParams.success) redirect('/');

  const data = await getData(params.data.page, searchParams.data.post, searchParams.data.site);
  if (!data) redirect('/');

  return (
    <div className="mx-auto mt-fluid-3 flex max-w-screen-lg flex-col gap-fluid-3">
      <section className="flex flex-col">
        <h1 className="text-5xl uppercase tracking-widest text-fancy">all posts</h1>
        <p className="text-sm text-2">Lorem, ipsum dolor sit amet consectetur dolor</p>
      </section>
      <Separator />
      <section className="flex justify-between gap-6 text-xs [&_form]:flex-1">
        <Filter site={searchParams.data.site} sites={data.sites} />
        <Separator orientation="vertical" className="h-auto" />
        <Search post={searchParams.data.post} />
      </section>
      <Separator />
      <section>
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {data.posts.map((post) => (
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
      </section>
    </div>
  );
}
