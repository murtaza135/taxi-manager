import { useSuspenseQuery, queryOptions, useQuery } from '@tanstack/react-query';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/config/api/supabaseClient';
import { AppError } from '@/errors/classes/AppError';
import { SupabaseError } from '@/errors/classes/SupabaseError';

async function getSession() {
  const { data, error } = await supabase.auth.getSession();

  if (error) throw new SupabaseError(error, null);

  if (!data.session) {
    throw new AppError({
      type: 'authentication',
      title: 'Something went wrong',
      description: 'You need to login again!',
    });
  }

  return data.session;
}

export function sessionOptions() {
  return queryOptions<Session, AppError | SupabaseError>({
    queryKey: ['auth', 'session'],
    queryFn: getSession,
  });
}

export function useSession() {
  const query = useSuspenseQuery(sessionOptions());
  return query;
}

export function useNonSuspenseSession() {
  const query = useQuery(sessionOptions());
  return query;
}
