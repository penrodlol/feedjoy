import { createClient } from '@supabase/supabase-js';
import Parser from 'rss-parser';
import type { Database } from '../../src/lib/supabase/types';

const supabase = createClient<Database>(
  `${process.env.SUPABASE_URL}`,
  `${process.env.SUPABASE_SERVICE_ROLE}`,
);

const sites = await supabase.from('site').select();
if (sites.error) throw sites.error;

const parser = new Parser();
const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
const posts = await Promise.all(
  sites.data.map(async (site) => {
    const feed = await parser
      .parseURL(site.url)
      .catch(() => console.error(site.name));
    if (!feed) return [];

    return feed.items
      .filter((post) => post.title && post.link && post.pubDate)
      .filter((post) => new Date(post.pubDate as string) > twoDaysAgo)
      .map((post) => ({
        site_id: site.id,
        title: post.title as string,
        link: post.link as string,
        pub_date: post.pubDate as string,
      }));
  }),
);

const payload = await supabase.from('post').upsert(posts.flat(), {
  onConflict: 'site_id, link',
  ignoreDuplicates: true,
});
if (payload.error) throw payload.error;
