import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useRevalidator } from 'react-router-dom';
import { SignOut } from '@supabase/supabase-js';
import { supabase } from '@/config/api/supabaseClient';
import { config } from '@/config/config';

// TODO if supabase.auth.signOut() fails, then it seems like the user is logged out on the frontend, but the session still remains active in the backend

export async function logout(options?: SignOut) {
  const scope = options?.scope ?? 'local';
  await supabase.auth.signOut({ scope });
  localStorage.removeItem(config.SUPABASE.authKey);
}

type Options = {
  redirect?: string;
  replace?: boolean;
  scope?: SignOut['scope'];
};

export function useLogout(options?: Options) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { revalidate } = useRevalidator();

  const mutation = useMutation<void>({
    mutationFn: () => logout({ scope: options?.scope }),
    onSettled: () => {
      if (options?.redirect) navigate(options.redirect, { replace: options.replace });
      queryClient.clear();
      revalidate();
    },
  });

  return mutation;
}
