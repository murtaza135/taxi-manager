import { useQuery } from '@tanstack/react-query';
import { AuthError, User } from '@supabase/supabase-js';
import { supabaseClient } from '@/config/api/supabaseClient';
import { AppError } from '@/config/errors/AppError';

export const queryKey = ['auth', 'user'] as const;

// NOTE getUser will return user related data from the server
// NOTE hence it is up-to-date and non-tampered data
// NOTE however, since it makes a request to the server
// NOTE it is less speed-efficient than the useSession hook
export async function getUser() {
  const { data, error } = await supabaseClient.auth.getUser();
  if (error) throw new AppError({ message: 'You need to login again', cause: error });
  return data.user;
}

export function useUser() {
  const query = useQuery<User, AuthError>({
    queryKey,
    queryFn: getUser,
  });

  return query;
}
