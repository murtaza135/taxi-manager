import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRevalidator } from 'react-router-dom';
import { supabase } from '@/config/api/supabaseClient';
import { queryClient as globalQueryClient } from '@/config/api/queryClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { SupabaseError } from '@/errors/classes/SupabaseError';
import { useToast } from '@/ui/toast';

export async function deleteDrivers(ids: number[]) {
  const session = await globalQueryClient.ensureQueryData(sessionOptions());

  const { error, status } = await supabase
    .from('driver')
    .delete()
    .eq('auth_id', session.user.id)
    .in('id', ids);

  if (error) {
    throw new SupabaseError(error, status, {
      globalTitle: 'Could not delete drivers',
      globalDescription: 'Something went wrong',
    });
  }

  return null;
}

export function useDeleteDrivers() {
  const queryClient = useQueryClient();
  const { revalidate } = useRevalidator();
  const { toast } = useToast();

  const mutation = useMutation<null, SupabaseError, number[]>({
    mutationFn: deleteDrivers,
    onSuccess: async (_data, ids) => {
      const queryInvalidations = ids.map((id) => (
        queryClient.invalidateQueries({ queryKey: ['drivers', id] })
      ));

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['drivers', 'list'] }),
        ...queryInvalidations,
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
