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
      .addGlobalMessage('Login failed')
      .addGlobalHint('Looks like things didn\'t go as planned. Maybe you would like to retry?')
      .addHint(0, 'You\'re offline! Please reconnect to the internet to continue using the app.')
      .addMessage(429, 'Too many login attempts!')
      .addHint(429, 'You have attempted to login too many times. Please try again later.')
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
      title: 'Login Error',
      description: error.message,
      variant: 'destructive',
    }),
  });

  return mutation;
}
