import { createClient } from '@supabase/supabase-js';
import { load } from 'cheerio';
import { decode, encode } from 'gpt-3-encoder';
import { Configuration, OpenAIApi } from 'openai';
import UserAgent from 'user-agents';
import type { Database } from '../../src/lib/supabase/types';

const supabase = createClient<Database>(
  `${process.env.SUPABASE_URL}`,
  `${process.env.SUPABASE_SERVICE_ROLE}`,
);

const openai = new OpenAIApi(
  new Configuration({ apiKey: `${process.env.OPENAI_API_KEY}` }),
);

(async () => {
  const posts = await supabase.from('post').select().is('summary', null);
  if (posts.error) throw posts.error;

  const headers = { 'User-Agent': new UserAgent(/Chrome/).toString() };
  const summaries = await Promise.all(
    posts.data.map(async ({ id, link }) => {
      const $ = load(await fetch(link, { headers }).then((res) => res.text()));
      $('header, footer, aside, noscript').remove();
      const root = $('main').length > 0 ? $('main p') : $('body p');
      const text = decode(encode(root.text()).slice(0, 8000));

      const payload = await openai.createChatCompletion({
        model: 'gpt-4',
        messages: [
          { role: 'user', content: `Summarize in 1 paragraph: ${text}` },
        ],
      });

      const summary = payload.data.choices?.[0]?.message?.content;
      return summary != null ? { id, summary } : null;
    }),
  );

  const payload = await supabase.rpc('bulk_update_summaries', {
    summaries: summaries.filter((summary) => !!summary),
  });
  if (payload.error) throw payload.error;
})();
