import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRevalidator } from 'react-router-dom';
import { supabase } from '@/config/api/supabaseClient';
import { queryClient as globalQueryClient } from '@/config/api/queryClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { SupabaseError } from '@/errors/classes/SupabaseError';
import { useToast } from '@/ui/toast';
import { ChangePasswordSchema } from '@/features/settings/schemas';

export async function changePassword(vars: ChangePasswordSchema) {
  const session = await globalQueryClient.ensureQueryData(sessionOptions());
  const email = session.user.email as string;

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password: vars.newPassword,
  });

  if (signInError) {
    throw new SupabaseError(signInError, null, {
      globalTitle: 'Incorrect password',
    });
  }

  const { error: updateError } = await supabase.auth.updateUser({ password: vars.newPassword });

  if (updateError) {
    throw new SupabaseError(updateError, null, {
      globalTitle: 'Could not update password',
    });
  }
}

export function useChangePassword() {
  const queryClient = useQueryClient();
  const { revalidate } = useRevalidator();
  const { toast } = useToast();

  const mutation = useMutation<void, SupabaseError, ChangePasswordSchema>({
    mutationFn: changePassword,
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
