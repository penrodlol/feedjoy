import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import type { Database } from './types';

export type Site = Database['public']['Tables']['site']['Row'];
export type Post = Database['public']['Tables']['post']['Row'];

export default createClient<Database>(
  z.string().url().parse(process.env.SUPABASE_URL),
  z.string().parse(process.env.SUPABASE_ANON_KEY),
  { auth: { persistSession: false } },
);
