import openai from '../libs/openai.mts';
import supabase from '../libs/supabase.mts';
import delay from './delay.mts';
import { type GetSummaries } from './get-summaries.mts';

export default async function getTopics(summaries: GetSummaries) {
  await Promise.all(
    summaries.map(async (payload, index) => {
      await delay(index);

      if (!payload?.id || !payload?.summary) return;

      const postsWithSummaries = await supabase
        .from('post')
        .update({ summary: payload.summary })
        .eq('id', payload.id);
      if (postsWithSummaries.error) throw postsWithSummaries.error;

      const content =
        'Give me a technical tool from this text (Only return the name of the tool. ' +
        `Exclude version numbers.):\n\n${payload.summary}`;
      const topicPayload = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content }],
      });

      const _topic = topicPayload.choices[0]?.message?.content?.trim();
      if (!_topic?.length) return;

      const postWithTopic = await supabase
        .from('post')
        .update({ topic: _topic })
        .eq('id', payload.id);
      if (postWithTopic.error) throw postWithTopic.error;
    }),
  );
}
