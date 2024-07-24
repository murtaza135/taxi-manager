import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useRevalidator } from 'react-router-dom';
import { User, Session, WeakPassword } from '@supabase/supabase-js';
import { useToast } from '@/ui/toast';
import { supabase } from '@/config/api/supabaseClient';
import { LoginFormSchema } from '@/features/auth/schemas';
import { SupabaseError } from '@/errors/classes/SupabaseError';

export async function login(args: LoginFormSchema) {
  const { data, error } = await supabase.auth.signInWithPassword(args);

  if (error) {
    throw new SupabaseError(error, null, {
      globalTitle: 'Could not login',
      globalDescription: 'Invalid credentials',
    });
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
    SupabaseError,
    LoginFormSchema
  >({
    mutationFn: login,
    onSuccess: async () => {
      if (options?.redirect) navigate(options.redirect);
      await queryClient.invalidateQueries();
      revalidate();
    },
    onError: (error) => {
      toast({
        title: error.title,
        description: error.description,
        variant: 'destructive',
      });
    },
  });

  return mutation;
}
