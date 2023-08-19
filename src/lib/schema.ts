import { z } from 'zod';

export type PageSchema = z.infer<typeof pageSchema>;
export type StringSchema = z.infer<typeof stringSchema>;
export type SlugSchema = z.infer<typeof slugSchema>;

export const pageSchema = z.coerce.number().positive().int();
export const stringSchema = z.string().trim();
export const slugSchema = stringSchema.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
