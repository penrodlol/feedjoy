import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import type { Database } from '../../../src/lib/supabase/types';

export default createClient<Database>(
  z.string().url().parse(process.env.SUPABASE_URL),
  z.string().parse(process.env.SUPABASE_SERVICE_ROLE),
);
