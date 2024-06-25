import { useSuspenseQuery, queryOptions } from '@tanstack/react-query';
import { AuthError, Session } from '@supabase/supabase-js';
import { supabase } from '@/config/api/supabaseClient';
import { AppError } from '@/errors/AppError';

async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw AppError.fromSupabaseError({ error });
  if (!data.session) throw new AppError({ type: 'auth' });
  return data.session;
}

export function sessionOptions() {
  return queryOptions<Session, AuthError>({
    queryKey: ['auth', 'session'],
    queryFn: getSession,
  });
}

export function useSession() {
  const query = useSuspenseQuery(sessionOptions());
  return query;
}
