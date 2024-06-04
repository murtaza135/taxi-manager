import { Session } from '@supabase/supabase-js';
import { useLocalStorage } from 'usehooks-ts';
import { config } from '@/config/config';

export function useLocalSession() {
  const [session] = useLocalStorage<Session | null>(
    config.SUPABASE.authKey,
    null,
  );

  return session;
}
