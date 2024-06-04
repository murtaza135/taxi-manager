import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AuthError, SignOut } from '@supabase/supabase-js';
import { supabase } from '@/config/api/supabaseClient';
import { config } from '@/config/config';
import { AppError } from '@/config/errors/AppError';

// TODO if supabase.auth.signOut() fails, then it seems like the user is logged out on the frontend, but the session still remains active in the backend

export async function logout(options?: SignOut) {
  const scope = options?.scope ?? 'local';
  const { error } = await supabase.auth.signOut({ scope });
  if (error) {
    throw AppError.fromSupabaseError({
      error,
      message: 'Something went wrong',
    });
  }
}

type Options = {
  redirect?: string;
  replace?: boolean;
  scope?: SignOut['scope'];
};

export function useLogout(options?: Options) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation<void, AuthError>({
    mutationFn: () => logout({ scope: options?.scope }),
    onMutate: () => {
      if (options?.redirect) {
        navigate(options.redirect, { replace: options?.replace });
      }
      localStorage.removeItem(config.SUPABASE.authKey);
      queryClient.clear();
    },
  });

  return mutation;
}
