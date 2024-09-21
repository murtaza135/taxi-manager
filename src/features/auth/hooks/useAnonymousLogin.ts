import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useRevalidator } from 'react-router-dom';
import { User, Session } from '@supabase/supabase-js';
import { useToast } from '@/ui/toast';
import { supabase } from '@/config/api/supabaseClient';
import { SupabaseError } from '@/errors/classes/SupabaseError';

export type AnonymousAuthResponseSuccessData = {
  user: User;
  session: Session;
};

export async function anonymousLogin() {
  const { data, error } = await supabase.auth.signInAnonymously();
  if (error) throw new SupabaseError(error, null, { globalTitle: 'Login Error' });

  const { error: companyError, status: companyStatus } = await supabase
    .from('company')
    .insert({ name: 'Unknown' });

  if (companyError) {
    throw new SupabaseError(companyError, companyStatus, { globalTitle: 'Login Error' });
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
    SupabaseError
  >({
    mutationFn: anonymousLogin,
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
