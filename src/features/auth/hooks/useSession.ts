import { useSuspenseQuery, queryOptions } from '@tanstack/react-query';
import { AuthError, Session } from '@supabase/supabase-js';
import { supabase } from '@/config/api/supabaseClient';
import { AppError } from '@/errors/AppError';
import { buildAppErrorFromSupabaseError } from '@/errors/supabaseErrorUtils';

async function getSession() {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw buildAppErrorFromSupabaseError(error)
      .setTitle('Something went wrong')
      .addDescription(0, 'You are offline! Please reconnet to the internet to conitnue using the app.')
      .addDescription(401, 'You need to login again!')
      .addDescription(500, 'Oops. Looks like there is something wrong on our side. Please try again later')
      .build();
  }

  if (!data.session) {
    throw new AppError({
      title: 'Something went wrong',
      description: 'You need to login again!',
    });
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
  const query = useSuspenseQuery(sessionOptions());
  return query;
}
