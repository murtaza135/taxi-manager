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
      Tables<'rent'>,
      | 'is_paid' | 'paid_date'
    >
  > & {
    id: number;
  }
>;

export async function payRent({ id, ...vars }: Variables) {
  const session = await globalQueryClient.ensureQueryData(sessionOptions());

  const { error, status } = await supabase
    .from('rent')
    .update(vars)
    .eq('auth_id', session.user.id)
    .eq('id', id);

  if (error) {
    throw new SupabaseError(error, status, {
      globalTitle: 'Could not update rent',
    });
  }
}

export function usePayRent() {
  const queryClient = useQueryClient();
  const { revalidate } = useRevalidator();
  const { toast } = useToast();

  const mutation = useMutation<void, SupabaseError, Variables>({
    mutationFn: payRent,
    onSuccess: async (_data, { id }) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['rents', 'list'] }),
        queryClient.invalidateQueries({ queryKey: ['rents', id], exact: true }),
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
