import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AuthTokenResponsePassword, AuthError } from '@supabase/supabase-js';
import { useToast } from '@/ui/toast';
import { supabase } from '@/config/api/supabaseClient';
import { LoginFormSchema } from '@/features/auth/schemas';

export async function login(args: LoginFormSchema) {
  const { data, error } = await supabase.auth.signInWithPassword(args);
  if (error) throw error;
  return data;
}

type Options = {
  successRedirect?: string;
};

export function useLogin(options?: Options) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();

  const mutation = useMutation<
    AuthTokenResponsePassword['data'],
    AuthError,
    LoginFormSchema
  >({
    mutationFn: login,
    onSuccess: async () => {
      if (options?.successRedirect) navigate(options.successRedirect);
      await queryClient.refetchQueries({ queryKey: ['auth'] });
    },
    onError: (error) => toast({
      title: 'Login Error',
      description: error.message,
      variant: 'destructive',
    }),
  });

  return mutation;
}
