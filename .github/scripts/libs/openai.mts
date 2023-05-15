import { Configuration, OpenAIApi } from 'openai';
import { z } from 'zod';

export default new OpenAIApi(
  new Configuration({ apiKey: z.string().parse(process.env.OPENAI_API_KEY) }),
);
