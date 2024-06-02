import { useQuery } from '@tanstack/react-query';
import { AuthError, Session } from '@supabase/supabase-js';
import { supabase } from '@/config/api/supabaseClient';
import { AppError } from '@/config/errors/AppError';
import { queryClient } from '@/config/api/queryClient';
import { logout } from '@/features/auth/hooks/useLogout';

export const queryKey = ['auth'] as const;

export async function getSession() {
  const localSession = localStorage.getItem('sb-127-auth-token');
  // console.log('here 0');
  if (!localSession) {
    throw new AppError({ message: 'You need to login again' });
  }
  // console.log('here 1');
  const temp = await supabase.auth.getSession();
  const { data, error } = await supabase.auth.getSession();
  // console.log('here 2');
  if (error) {
    // queryClient.clear();
    // await logout();
    throw new AppError({ message: error.message, cause: error });
  }
  if (!data.session) {
    // queryClient.clear();
    // await logout();
    throw new AppError({ message: 'You need to login again' });
  }
  return data.session;
}

// NOTE getSession will return user related data from local storage
// NOTE hence it may have been tampered with
// NOTE if secure data is required, use the useUser hook
export async function getSession2() {
  const { data, error } = await supabase.auth.getSession();
  console.log(data);
  console.log(error);
  if (error) {
    // queryClient.clear();
    // await logout();
    throw new AppError({ message: error.message, cause: error });
  }
  if (!data.session) {
    // queryClient.clear();
    // await logout();
    throw new AppError({ message: 'You need to login again' });
  }
  return data.session;
}

export function useSession() {
  const query = useQuery<Session, AuthError>({
    queryKey,
    queryFn: getSession,
  });

  return query;
}
