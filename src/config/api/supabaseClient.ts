import { createClient } from '@supabase/supabase-js';
import { config } from '@/config/config';
import { Database } from '@/types/supabase/database';

export const supabase = createClient<Database>(
  config.VITE_SUPABASE_URL,
  config.VITE_SUPABASE_ANON_KEY,
);

export type Supabase = typeof supabase;
