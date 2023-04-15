import { pageSchema, slugSchema } from '@/const/schemas';
import supabase, { type Post } from '@/lib/supabase';
import Breadcrumbs from '@/ui/breadcrumbs';
import Card from '@/ui/card';
import Datetime from '@/ui/datetime';
import Paginator from '@/ui/paginator';
import { User } from 'lucide-react';
import { redirect } from 'next/navigation';
import { z } from 'zod';

type Props = { params: { site: string; page: string } };

const schema = z.object({ page: pageSchema, site: slugSchema });

async function getSitePosts({ site, page }: z.infer<typeof schema>) {
  const { data, error } = await supabase
    .from('site')
    .select('*, post(*)')
    .eq('slug', site)
    .order('pub_date', { ascending: false, foreignTable: 'post' })
    .range((page - 1) * 30, (page - 1) * 30 + 29, { foreignTable: 'post' })
    .single();
  if (error) return undefined;

  return { ...data, posts: data.post as Post[] };
}

export const revalidate = 86400;

export default async function Page(props: Props) {
  const params = schema.safeParse(props.params);
  if (!params.success) redirect('/');

  const sitePosts = await getSitePosts(params.data);
  if (!sitePosts) redirect('/sites');
  if (!sitePosts.posts.length) redirect(`/sites/${params.data.site}/page/1`);

  return (
    <div className="mt-fluid-4 flex flex-col gap-fluid-4">
      <div className="flex flex-col gap-2">
        <Breadcrumbs routes={[{ href: '/sites/page/1', name: 'sites' }]} />
        <h1 className="mb-1 font-fancy -tracking-[0.1em] text-3xl">
          {sitePosts.name}
        </h1>
      </div>
      <section>
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {sitePosts.posts.map((post) => (
            <li key={post.slug}>
              <Card
                href={`/sites/${sitePosts.slug}/${post.slug}`}
                title={post.title}
              >
                <p className="flex items-center gap-2">
                  <User className="h-4 w-4 shrink-0 stroke-brand" aria-hidden />
                  <span>{sitePosts.name}</span>
                </p>
                <p className="flex items-center gap-2 text-2">
                  <Datetime>{post.pub_date}</Datetime>
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <Paginator
          prev={`/sites/${sitePosts.slug}/page/${params.data.page - 1}`}
          next={`/sites/${sitePosts.slug}/page/${params.data.page + 1}`}
          isFirst={params.data.page === 1}
          isLast={sitePosts.posts.length < 30}
        />
      </section>
    </div>
  );
}
