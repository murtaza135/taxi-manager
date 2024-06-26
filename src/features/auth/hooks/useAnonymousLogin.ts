import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useRevalidator } from 'react-router-dom';
import { AuthError, User, Session } from '@supabase/supabase-js';
import { useToast } from '@/ui/toast';
import { supabase } from '@/config/api/supabaseClient';
import { AppError } from '@/errors/AppError';

export type AnonymousAuthResponseSuccessData = {
  user: User;
  session: Session;
};

export async function anonymousLogin() {
  const { data, error } = await supabase.auth.signInAnonymously();

  if (error) {
    throw AppError.fromSupabaseError({
      error,
      message: 'Something went wrong',
    });
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
    AuthError
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
