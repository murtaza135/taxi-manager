import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AuthError, User, Session, WeakPassword } from '@supabase/supabase-js';
import { useToast } from '@/ui/toast';
import { supabase } from '@/config/api/supabaseClient';
import { LoginFormSchema } from '@/features/auth/schemas';
import { AppErrorBuilder } from '@/config/errors/AppErrorBuilder';
import { AppError } from '@/config/errors/AppError';

export type AuthTokenResponsePasswordSuccess = {
  user: User;
  session: Session;
  weakPassword?: WeakPassword | undefined;
};

export async function login(args: LoginFormSchema) {
  const { data, error } = await supabase.auth.signInWithPassword(args);

  if (error) {
    throw AppError.fromSupabaseError({
      error,
      message: 'Invalid login crendentials',
    });
  }

  // if (error) {
  //   throw await AppErrorBuilder
  //     .fromSupabaseError(error)
  //     .setAuthErrorMessage('Invalid login credentials')
  //     .deleteSessionOnAuthError()
  //     .build();
  // }

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
    AuthTokenResponsePasswordSuccess,
    AuthError,
    LoginFormSchema
  >({
    mutationFn: login,
    onSuccess: async () => {
      if (options?.successRedirect) navigate(options.successRedirect);
      await queryClient.invalidateQueries();
    },
    onError: (error) => toast({
      title: 'Login Error',
      description: error.message,
      variant: 'destructive',
    }),
  });

  return mutation;
}
