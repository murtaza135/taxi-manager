import { useQuery, queryOptions } from '@tanstack/react-query';
import { AuthError, User } from '@supabase/supabase-js';
import { supabase } from '@/config/api/supabaseClient';
import { AppErrorBuilder } from '@/config/errors/AppErrorBuilder';

async function getUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    throw await AppErrorBuilder
      .fromSupabaseError(error)
      .setAuthErrorMessage('You need to login again')
      .logoutOnAuthError()
      .build();
  }
  return data.user;
}

export function userOptions() {
  return queryOptions<User, AuthError>({
    queryKey: ['auth', 'user'],
    queryFn: getUser,
  });
}

export function useUser() {
  const query = useQuery(userOptions());
  return query;
}
