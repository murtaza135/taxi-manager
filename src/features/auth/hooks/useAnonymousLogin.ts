import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useRevalidator } from 'react-router-dom';
import { User, Session } from '@supabase/supabase-js';
import { useToast } from '@/ui/toast';
import { supabase } from '@/config/api/supabaseClient';
import { AppError } from '@/errors/AppError';
import { buildAppErrorFromSupabaseError } from '@/errors/supabaseErrorUtils';

export type AnonymousAuthResponseSuccessData = {
  user: User;
  session: Session;
};

export async function anonymousLogin() {
  const { data, error } = await supabase.auth.signInAnonymously();

  if (error) {
    throw buildAppErrorFromSupabaseError(error)
      .setTitle('Login Error')
      .setDescription('Looks like things didn\'t go as planned. Maybe you would like to retry?')
      .setDescription('offline', 'You are offline! Please reconnect to the internet to continue using the app.')
      .setDescription('tooManyRequests', 'Too many login attempts! Please try again later.')
      .build();
  }

  return data as AnonymousAuthResponseSuccessData;
}

type Options = {
  redirect?: string;
};

export function useAnonymousLogin(options?: Options) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { revalidate } = useRevalidator();
  const { toast } = useToast();

  const mutation = useMutation<
    AnonymousAuthResponseSuccessData,
    AppError
  >({
    mutationFn: anonymousLogin,
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
