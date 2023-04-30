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

const posts = await supabase.from('post').select().is('summary', null);
if (posts.error) throw posts.error;

const headers = { 'User-Agent': new UserAgent(/Chrome/).toString() };
const summaries = await Promise.all(
  posts.data.map(async ({ id, link }) => {
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

await Promise.all(
  summaries?.map(async (payload) => {
    if (!payload?.id || !payload?.summary) return;

    const postsWithSummaries = await supabase
      .from('post')
      .update({ summary: payload.summary })
      .eq('id', payload.id);
    if (postsWithSummaries.error) throw postsWithSummaries.error;

    const content = `Give me a list of 2 comma separated technical tools from this text:\n\n${payload.summary}`;
    const topicsPayload = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content }],
    });

    const _topics = topicsPayload.data.choices[0]?.message?.content?.split(',');
    const topics = _topics?.map((topic) => topic.trim()).slice(0, 2);
    if (topics?.length !== 2) return;

    const postsWithTopics = await supabase
      .from('topic')
      .insert(topics.map((name) => ({ name, post_id: payload.id })));
    if (postsWithTopics.error) throw postsWithTopics.error;
  }),
);
