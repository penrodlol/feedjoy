import action from '@actions/github';
import supabase from './libs/supabase.mjs';
// import getPosts from './utils/get-posts.mjs';
// import getSummaries from './utils/get-summaries.mjs';
// import getTopics from './utils/get-topics.mjs';

const siteId = action.context.payload.inputs.site;

const site = await supabase.from('site').select().eq('id', siteId).single();
if (site.error) throw site.error;

console.log(site.data);

// const sixMonthsAgo = new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000);
// await getPosts([site.data], sixMonthsAgo);
// const summaries = await getSummaries();
// await getTopics(summaries);
