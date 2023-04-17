import { datetimeFrmt, numberFrmt } from '@/const/formatters';
import { pageSchema, type PageSchema } from '@/const/schemas';
import supabase, { type Post } from '@/lib/supabase';
import Card from '@/ui/card';
import Paginator from '@/ui/paginator';
import { History, Library } from 'lucide-react';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export const revalidate = 86400;

type Props = { params: { page: string } };

async function getSites(page: PageSchema) {
  const { data, error } = await supabase
    .from('site')
    .select('slug, name, post!inner(pub_date)')
    .not('post.pub_date', 'is', null)
    .order('name', { ascending: true })
    .order('pub_date', { ascending: false, foreignTable: 'post' })
    .range((page - 1) * 30, (page - 1) * 30 + 29);
  if (error) return undefined;

  return data.map((site) => {
    const posts = site.post as Post[];
    return { ...site, posts, latest: posts[0] as Post };
  });
}

export default async function Page(props: Props) {
  const params = z.object({ page: pageSchema }).safeParse(props.params);
  if (!params.success) redirect('/sites/page/1');

  const sites = await getSites(params.data.page);
  if (!sites) redirect('/');
  if (!sites.length) redirect('/sites/page/1');

  return (
    <div className="mt-fluid-4 flex flex-col gap-fluid-2">
      <h1 className="mb-1 font-fancy -tracking-[0.1em] text-3xl">sites</h1>
      <section>
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {sites.map((site) => (
            <li key={site.slug}>
              <Card href={`/sites/${site.slug}/page/1`} title={site.name}>
                <p className="flex items-center gap-2">
                  <Library className="h-4 w-4 shrink-0" aria-hidden />
                  <span>{numberFrmt.format(site.posts.length)} posts</span>
                </p>
                <p className="flex items-center gap-2">
                  <History className="h-4 w-4 shrink-0" aria-hidden />
                  <time dateTime={new Date(site.latest.pub_date).toISOString()}>
                    {datetimeFrmt.format(new Date(site.latest.pub_date))}
                  </time>
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <Paginator
          prev={`/sites/page/${params.data.page - 1}`}
          next={`/sites/page/${params.data.page + 1}`}
          isFirst={params.data.page === 1}
          isLast={sites.length < 30}
        />
      </section>
    </div>
  );
}
