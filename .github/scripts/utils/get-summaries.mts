import { load } from 'cheerio';
import { decode, encode } from 'gpt-3-encoder';
import UserAgent from 'user-agents';
import openai from '../libs/openai.mts';
import supabase from '../libs/supabase.mts';
import delay from './delay.mts';

export type GetSummaries = Awaited<ReturnType<typeof getSummaries>>;

export default async function getSummaries() {
  const posts = await supabase.from('post').select().is('summary', null);
  if (posts.error) throw posts.error;

  const headers = { 'User-Agent': new UserAgent(/Chrome/).toString() };

  return Promise.all(
    posts.data.map(async ({ id, link }, index) => {
      await delay(index);

      const $ = load(await fetch(link, { headers }).then((res) => res.text()));
      $('header, footer, aside, noscript').remove();
      const root = $('main').length > 0 ? $('main p') : $('body p');
      const text = decode(encode(root.text()).slice(0, 8000));

      const content = `Summarize in 1 paragraph: ${text}`;
      const payload = await openai.createChatCompletion({
        model: 'gpt-4',
        messages: [{ role: 'user', content }],
      });

      const summary = payload.data.choices?.[0]?.message?.content;
      return summary != null ? { id, summary } : null;
    }),
  );
}
