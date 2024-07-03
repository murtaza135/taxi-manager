import { createClient } from '@supabase/supabase-js';
import { config } from '@/config/config';
import { Database } from '@/types/supabase/database';

export const supabase = createClient<Database>(
  config.env.VITE_SUPABASE_URL,
  config.env.VITE_SUPABASE_ANON_KEY,
);

export type Supabase = typeof supabase;
