import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import type { Database } from './types';

type Public = Database['public'];

export type Tables<T extends keyof Public['Tables']> = Public['Tables'][T]['Row'];
export type Enums<T extends keyof Public['Enums']> = Public['Enums'][T];
export type Functions<T extends keyof Public['Functions']> = Public['Functions'][T]['Returns'];

export default createClient<Database>(
  z.string().url().parse(process.env.SUPABASE_URL),
  z.string().parse(process.env.SUPABASE_ANON_KEY),
  { auth: { persistSession: false } },
);
