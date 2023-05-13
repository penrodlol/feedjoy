import openai from '../libs/openai.mjs';
import supabase from '../libs/supabase.mjs';
import { type GetSummaries } from './get-summaries.mts';

export default async function getTopics(summaries: GetSummaries) {
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

      const _topics =
        topicsPayload.data.choices[0]?.message?.content?.split(',');
      const topics = _topics?.map((topic) => topic.trim()).slice(0, 2);
      if (topics?.length !== 2) return;

      const postsWithTopics = await supabase
        .from('topic')
        .insert(topics.map((name) => ({ name, post_id: payload.id })));
      if (postsWithTopics.error) throw postsWithTopics.error;
    }),
  );
}
