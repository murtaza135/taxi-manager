import { createClient } from '@supabase/supabase-js';
import { config } from '@/app/config';

export const supabase = createClient(
  config.VITE_SUPABASE_URL,
  config.VITE_SUPABASE_ANON_KEY,
);