import supabase from './libs/supabase.mjs';
import getPosts from './utils/get-posts.mjs';
import getSummaries from './utils/get-summaries.mjs';
import getTopics from './utils/get-topics.mjs';

const sites = await supabase.from('site').select();
if (sites.error) throw sites.error;

const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
await getPosts(sites.data, twoDaysAgo);
const summaries = await getSummaries();
await getTopics(summaries);
