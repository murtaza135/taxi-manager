import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRevalidator } from 'react-router-dom';
import { supabase } from '@/config/api/supabaseClient';
import { SupabaseError } from '@/errors/classes/SupabaseError';
import { useToast } from '@/ui/toast';

export async function changeEmail(email: string) {
  const { data, error } = await supabase.auth.updateUser({ email });

  if (error) {
    throw new SupabaseError(error, null, {
      globalTitle: 'Could not update email',
    });
  }

  return data.user.email as string;
}

export function useChangeEmail() {
  const queryClient = useQueryClient();
  const { revalidate } = useRevalidator();
  const { toast } = useToast();

  const mutation = useMutation<string, SupabaseError, string>({
    mutationFn: changeEmail,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['auth', 'session'] }),
        queryClient.invalidateQueries({ queryKey: ['auth', 'user'] }),
      ]);
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
