import { createClient } from '@supabase/supabase-js';
import type { Database } from '../../../src/lib/supabase/types';

export default createClient<Database>(
  `${process.env.SUPABASE_URL}`,
  `${process.env.SUPABASE_SERVICE_ROLE}`,
);
