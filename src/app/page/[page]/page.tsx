import { paramsSchema, type ParamsSchema } from '@/const/schemas';
import supabase, { type Site } from '@/lib/supabase';
import Card from '@/ui/card';
import Datetime from '@/ui/datetime';
import Paginator from '@/ui/paginator';
import { User } from 'lucide-react';
import { redirect } from 'next/navigation';

type Props = { params: { page: string } };

async function getPosts(page: ParamsSchema['page']) {
  const { data, error } = await supabase
    .from('post')
    .select('slug, title, pub_date, site(slug, name)')
    .order('pub_date', { ascending: false })
    .range((page - 1) * 30, (page - 1) * 30 + 29);
  if (error) return undefined;

  return data.map((post) => ({ ...post, site: post.site as Site }));
}

export const revalidate = 86400;

export default async function Page(props: Props) {
  const params = paramsSchema.safeParse(props.params);
  if (!params.success) redirect('/');

  const posts = await getPosts(params.data.page);
  if (!posts) redirect('/');
  if (!posts.length) redirect('/page/1');

  return (
    <div className="mt-fluid-4 flex flex-col gap-fluid-2">
      <h1 className="mb-1 font-fancy -tracking-[0.1em] text-3xl">posts</h1>
      <section>
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <li key={post.slug}>
              <Card
                href={`/sites/${post.site.slug}/${post.slug}`}
                title={post.title}
              >
                <p className="flex items-center gap-2">
                  <User className="h-4 w-4 shrink-0" aria-hidden />
                  <span>{post.site.name}</span>
                </p>
                <Datetime>{post.pub_date}</Datetime>
              </Card>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <Paginator
          prev={`/page/${params.data.page - 1}`}
          next={`/page/${params.data.page + 1}`}
          isFirst={params.data.page === 1}
          isLast={posts.length < 30}
        />
      </section>
    </div>
  );
}
