import { z } from 'zod';

export type ParamsSchema = z.infer<typeof paramsSchema>;

export const paramsSchema = z.object({
  page: z.preprocess(Number, z.number().positive().int()),
});
