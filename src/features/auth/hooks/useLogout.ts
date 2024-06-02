import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AuthError, SignOut } from '@supabase/supabase-js';
import { useToast } from '@/ui/toast';
import { supabase } from '@/config/api/supabaseClient';
import { AppError } from '@/config/errors/AppError';

// TODO cleanup
// TODO sessions on supabase server do not get deleted on error callback?

export async function logout(options?: SignOut) {
  const scope = options?.scope ?? 'local';
  const { error } = await supabase.auth.signOut({ scope });
  if (error) throw new AppError({ message: error.message, cause: error });
}

type Options = {
  successRedirect?: string;
  scope?: SignOut['scope'];
};

export function useLogout(options?: Options) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();

  const mutation = useMutation<void, AuthError>({
    mutationFn: () => logout({ scope: options?.scope }),
    onSuccess: () => {
      if (options?.successRedirect) navigate(options.successRedirect);
      queryClient.clear();
    },
    onError: (error) => {
      // toast({
      //   title: 'Logout Error',
      //   description: error.message,
      //   variant: 'destructive',
      // })
      if (options?.successRedirect) navigate(options.successRedirect);
      localStorage.removeItem('sb-127-auth-token');
      queryClient.clear();
    },
  });

  return mutation;
}
