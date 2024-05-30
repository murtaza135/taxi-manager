import { useQuery } from '@tanstack/react-query';
import { AuthError, Session } from '@supabase/supabase-js';
import { supabase } from '@/config/api/supabaseClient';

export const queryKey = ['auth'] as const;

// NOTE getSession will return user related data from local storage
// NOTE hence it may have been tampered with
// NOTE if secure data is required, use the useUser hook
export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  if (!data.session) throw new AuthError('No session available');
  return data.session;
}

export function useSession() {
  const query = useQuery<Session, AuthError>({
    queryKey,
    queryFn: getSession,
  });

  return query;
}
