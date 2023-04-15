import { z } from 'zod';

export type PageSchema = z.infer<typeof pageSchema>;
export type SlugSchema = z.infer<typeof slugSchema>;

export const pageSchema = z.coerce.number().positive().int();
export const slugSchema = z.coerce.string().uuid();
