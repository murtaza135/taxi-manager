import { useSuspenseQuery, queryOptions } from '@tanstack/react-query';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/config/api/supabaseClient';
import { SupabaseError } from '@/errors/classes/SupabaseError';

async function getUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new SupabaseError(error, null, {
      globalTitle: 'Could not get account data',
    });
  }

  return data.user;
}

export function userOptions() {
  return queryOptions<User, SupabaseError>({
    queryKey: ['auth', 'user'],
    queryFn: getUser,
  });
}

export function useUser() {
  const query = useSuspenseQuery(userOptions());
  return query;
}
