import supabase from './libs/supabase.mts';
import getPosts from './utils/get-posts.mts';
import getSummaries from './utils/get-summaries.mts';
import getTopics from './utils/get-topics.mts';

const sites = await supabase.from('site').select();
if (sites.error) throw sites.error;

const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
await getPosts(sites.data, twoDaysAgo);
const summaries = await getSummaries();
await getTopics(summaries);
