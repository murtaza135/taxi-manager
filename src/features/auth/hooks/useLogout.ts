import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AuthError, SignOut } from '@supabase/supabase-js';
import { useToast } from '@/ui/toast';
import { supabase } from '@/config/api/supabaseClient';

export async function logout(options?: SignOut) {
  const scope = options?.scope ?? 'local';
  const { error } = await supabase.auth.signOut({ scope });
  if (error) throw error;
}

type Options = {
  successRedirect?: string;
  scope?: SignOut['scope'];
};

export function useLogout(options?: Options) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();

  const mutation = useMutation<void, AuthError, void>({
    mutationFn: () => logout({ scope: options?.scope }),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ['auth'] });
      if (options?.successRedirect) navigate(options.successRedirect);
    },
    onError: (error) => toast({
      title: 'Logout Error',
      description: error.message,
      variant: 'destructive',
    }),
  });

  return mutation;
}
