import { Session } from '@supabase/supabase-js';
import { useLocalStorage } from 'usehooks-ts';
import { config } from '@/config/config';

export function getLocalSession() {
  const data = localStorage.getItem(config.supabase.authKey);
  if (!data) return null;
  return JSON.parse(data) as Session;
}

export function useLocalSession() {
  const [session] = useLocalStorage<Session | null>(
    config.supabase.authKey,
    null,
  );

  return session;
}
