import Parser from 'rss-parser';
import type { Site } from '../../../src/lib/supabase';
import supabase from '../libs/supabase.mts';

export default async function getPosts(sites: Array<Site>, min: Date) {
  const parser = new Parser();
  const posts = await Promise.all(
    sites.map(async ({ id, url, name }) => {
      const feed = await parser.parseURL(url).catch(() => console.error(name));
      if (!feed) return [];

      return feed.items
        .filter((post) => post.title && post.link && post.pubDate)
        .filter((post) => new Date(post.pubDate as string) > min)
        .map((post) => ({
          site_id: id,
          title: post.title as string,
          link: post.link as string,
          pub_date: post.pubDate as string,
        }));
    }),
  );

  const { error } = await supabase.from('post').upsert(posts.flat(), {
    onConflict: 'site_id, link',
    ignoreDuplicates: true,
  });
  if (error) throw error;
}
