import { useQuery } from '@tanstack/react-query';
import { AuthError, User } from '@supabase/supabase-js';
import { supabase } from '@/config/api/supabaseClient';

export const queryKey = ['auth'] as const;

// NOTE getUser will return user related data from the server
// NOTE hence it is up-to-date and non-tampered data
// NOTE however, since it makes a request to the server
// NOTE it is less speed-efficient than the useSession hook
export async function getUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user;
}

export function useUser() {
  const query = useQuery<User, AuthError>({
    queryKey,
    queryFn: getUser,
  });

  return query;
}
