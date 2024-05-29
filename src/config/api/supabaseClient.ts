import { createClient } from '@supabase/supabase-js';
import { config } from '@/config/config';
import { Database } from '@/types/database';

export const supabase = createClient<Database>(
  config.VITE_SUPABASE_URL,
  config.VITE_SUPABASE_ANON_KEY,
);
