import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useRevalidator } from 'react-router-dom';
import { User, Session, WeakPassword } from '@supabase/supabase-js';
import { useToast } from '@/ui/toast';
import { supabase } from '@/config/api/supabaseClient';
import { LoginFormSchema } from '@/features/auth/schemas';
import { AppError } from '@/errors/AppError';
import { buildAppErrorFromSupabaseError } from '@/errors/supabaseErrorUtils';

export async function login(args: LoginFormSchema) {
  const { data, error } = await supabase.auth.signInWithPassword(args);

  if (error) {
    throw buildAppErrorFromSupabaseError(error)
      .setTitle('Could not login')
      .setDescription('Invalid credentials')
      .setDescription('offline', 'You are offline! Please reconnect to the internet to login.')
      .setDescription('tooManyRequests', 'Too many login attempts! Please try again later.')
      .setDescription('unknown', 'Something went wrong')
      .setDescription('server', 'Something went wrong')
      .build();
  }

  return data;
}

export type AuthTokenResponsePasswordSuccessData = {
  user: User;
  session: Session;
  weakPassword?: WeakPassword | undefined;
};

type Options = {
  redirect?: string;
};

export function useLogin(options?: Options) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { revalidate } = useRevalidator();
  const { toast } = useToast();

  const mutation = useMutation<
    AuthTokenResponsePasswordSuccessData,
    AppError,
    LoginFormSchema
  >({
    mutationFn: login,
    onSuccess: async () => {
      if (options?.redirect) navigate(options.redirect);
      await queryClient.invalidateQueries();
      revalidate();
    },
    onError: (error) => toast({
      title: error.title,
      description: error.description,
      variant: 'destructive',
    }),
  });

  return mutation;
}
