import { z } from 'zod';

export const paramsSchema = z.object({
  page: z.preprocess(Number, z.number().positive().int()),
});
