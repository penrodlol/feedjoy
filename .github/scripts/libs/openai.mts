import { OpenAI } from 'openai';
import { z } from 'zod';

export default new OpenAI({ apiKey: z.string().parse(process.env.OPENAI_API_KEY) });
