import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRevalidator } from 'react-router-dom';
import { supabase } from '@/config/api/supabaseClient';
import { queryClient as globalQueryClient } from '@/config/api/queryClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { SupabaseError } from '@/errors/classes/SupabaseError';
import { useToast } from '@/ui/toast';
import { Tables } from '@/types/database';
import { Prettify } from '@/types/utils';

export type Variables = Prettify<
  Partial<
    Pick<
      Tables<'settings'>,
      'rent_day'
    >
  >
>;

export async function updateSettings(vars: Variables) {
  const session = await globalQueryClient.ensureQueryData(sessionOptions());

  const { error, status } = await supabase
    .from('settings')
    .update(vars)
    .eq('auth_id', session.user.id);

  if (error) {
    throw new SupabaseError(error, status, {
      globalTitle: 'Could not update settings',
    });
  }
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  const { revalidate } = useRevalidator();
  const { toast } = useToast();

  const mutation = useMutation<void, SupabaseError, Variables>({
    mutationFn: updateSettings,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['auth', 'settings'] });
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
