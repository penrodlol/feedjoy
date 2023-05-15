import action from '@actions/github';
import supabase from './libs/supabase.mts';
import getPosts from './utils/get-posts.mts';
import getSummaries from './utils/get-summaries.mts';
import getTopics from './utils/get-topics.mts';

const id = action.context.payload.inputs.site;
const site = await supabase.from('site').select().eq('id', id).single();
if (site.error) throw site.error;

const oneYearAgo = new Date(Date.now() - 12 * 30 * 24 * 60 * 60 * 1000);
await getPosts([site.data], oneYearAgo);
const summaries = await getSummaries();
await getTopics(summaries);
