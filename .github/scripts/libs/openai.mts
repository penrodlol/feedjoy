import { Configuration, OpenAIApi } from 'openai';

export default new OpenAIApi(
  new Configuration({ apiKey: `${process.env.OPENAI_API_KEY}` }),
);
