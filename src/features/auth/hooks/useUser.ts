import { useSuspenseQuery, queryOptions } from '@tanstack/react-query';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/config/api/supabaseClient';
import { AppError } from '@/errors/AppError';
import { buildAppErrorFromSupabaseError } from '@/errors/supabaseErrorUtils';

async function getUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw buildAppErrorFromSupabaseError(error)
      .setTitle('Could not get account data')
      .addDescription(0, 'You are offline! Please reconnet to the internet to conitnue using the app.')
      .addDescription(401, 'You need to login again!')
      .addDescription(500, 'Oops. Looks like there is something wrong on our side. Please try again later.')
      .build();
  }

  return data.user;
}

export function userOptions() {
  return queryOptions<User, AppError>({
    queryKey: ['auth', 'user'],
    queryFn: getUser,
  });
}

export function useUser() {
  const query = useSuspenseQuery(userOptions());
  return query;
}
