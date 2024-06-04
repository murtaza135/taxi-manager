import { useQuery, queryOptions } from '@tanstack/react-query';
import { AuthError, Session } from '@supabase/supabase-js';
import { supabase } from '@/config/api/supabaseClient';
import { config } from '@/config/config';
import { AppErrorBuilder } from '@/config/errors/AppErrorBuilder';
import { AppError } from '@/config/errors/AppError';

async function getSession() {
  const localSession = localStorage.getItem(config.SUPABASE.authKey);
  console.log(localSession);
  if (!localSession) {
    // throw await AppErrorBuilder
    //   .fromType('auth')
    //   .deleteSessionOnAuthError()
    //   .build();
    throw new AppError({ type: 'auth' });
  }
  console.log('here 1');

  const { data, error } = await supabase.auth.getSession();
  if (error) {
    // throw await AppErrorBuilder
    //   .fromType('auth')
    //   .deleteSessionOnAuthError()
    //   .build();
    throw AppError.fromSupabaseError({ error });
  }

  if (!data.session) {
    // throw await AppErrorBuilder
    //   .fromType('auth')
    //   .deleteSessionOnAuthError()
    //   .build();
    throw new AppError({ type: 'auth' });
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
