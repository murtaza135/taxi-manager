import { useQuery, queryOptions } from '@tanstack/react-query';
import { AuthError, Session } from '@supabase/supabase-js';
import { supabase } from '@/config/api/supabaseClient';
import { config } from '@/config/config';
import { AppErrorBuilder } from '@/config/errors/AppErrorBuilder';

async function getSession() {
  const localSession = localStorage.getItem(config.SUPABASE.authKey);
  console.log(localSession);
  if (!localSession) {
    throw await AppErrorBuilder
      .fromType('auth')
      .deleteSessionOnAuthError()
      .build();
  }
  console.log('here 1');

  const { data, error } = await supabase.auth.getSession();
  if (error) {
    throw await AppErrorBuilder
      .fromType('auth')
      .deleteSessionOnAuthError()
      .build();
  }

  if (!data.session) {
    throw await AppErrorBuilder
      .fromType('auth')
      .deleteSessionOnAuthError()
      .build();
  }

  return data.session;
}

export function sessionOptions() {
  return queryOptions<Session, AuthError>({
    queryKey: ['auth', 'session'],
    queryFn: getSession,
  });
}

export function useSession() {
  const query = useQuery(sessionOptions());
  return query;
}
