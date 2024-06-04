import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AuthError, SignOut } from '@supabase/supabase-js';
import { supabase } from '@/config/api/supabaseClient';
import { buildAppError } from '@/config/errors/AppErrorBuilder';
import { config } from '@/config/config';

// TODO if supabase.auth.signOut() fails, then it seems like the user is logged out on the frontend, but the session still remains active in the backend

export async function logout(options?: SignOut) {
  const scope = options?.scope ?? 'local';
  const { error } = await supabase.auth.signOut({ scope });
  if (error) {
    throw await buildAppError(error)
      .setAuthErrorMessage('Something went wrong')
      .logoutOnAuthError()
      .build();
  }
}

type Options = {
  redirect?: string;
  scope?: SignOut['scope'];
};

export function useLogout(options?: Options) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation<void, AuthError>({
    mutationFn: () => logout({ scope: options?.scope }),
    onMutate: () => {
      if (options?.redirect) navigate(options.redirect);
      localStorage.removeItem(config.SUPABASE.authKey);
      queryClient.clear();
    },
  });

  return mutation;
}
