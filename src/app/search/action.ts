'use server';

import supabase, { type Site } from '@/lib/supabase';
import { z } from 'zod';

export type SearchPosts = Awaited<ReturnType<typeof searchPosts>>;

export async function searchPosts(payload: string) {
  const query = z.string().trim().nonempty().safeParse(payload);
  if (!query.success) return undefined;

  const { data, error } = await supabase
    .from('post')
    .select('title, pub_date, slug, site(name, slug)')
    .textSearch('fts', query.data)
    .order('pub_date', { ascending: false })
    .limit(30);
  if (error) return undefined;

  return data.map((post) => ({ ...post, site: post.site as Site }));
}
