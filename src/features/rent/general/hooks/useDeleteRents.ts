import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRevalidator } from 'react-router-dom';
import { supabase } from '@/config/api/supabaseClient';
import { queryClient as globalQueryClient } from '@/config/api/queryClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { SupabaseError } from '@/errors/classes/SupabaseError';
import { useToast } from '@/ui/toast';

export async function deleteRents(ids: number[]) {
  const session = await globalQueryClient.ensureQueryData(sessionOptions());

  const { data, error: selectError, status: selectStatus } = await supabase
    .from('rent')
    .select('receipt_document_path')
    .eq('auth_id', session.user.id)
    .in('id', ids);

  if (selectError) {
    throw new SupabaseError(selectError, selectStatus, {
      globalTitle: 'Could not delete rents',
    });
  }

  const files = data
    .flatMap(({ receipt_document_path }) => [receipt_document_path])
    .filter((file) => !!file) as string[];

  if (files.length > 0) {
    const { error: storageError } = await supabase
      .storage
      .from('main')
      .remove(files);

    if (storageError) {
      throw new SupabaseError(storageError, null, {
        globalTitle: 'Could not delete rents',
      });
    }
  }

  const { error, status } = await supabase
    .from('rent')
    .delete()
    .eq('auth_id', session.user.id)
    .in('id', ids);

  if (error) {
    throw new SupabaseError(error, status, {
      globalTitle: 'Could not delete rents',
    });
  }
}

export function useDeleteRents() {
  const queryClient = useQueryClient();
  const { revalidate } = useRevalidator();
  const { toast } = useToast();

  const mutation = useMutation<void, SupabaseError, number[]>({
    mutationFn: deleteRents,
    onSuccess: async (_data, ids) => {
      const queryInvalidations = ids.map((id) => (
        queryClient.invalidateQueries({ queryKey: ['rents', id], exact: true })
      ));

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['rents', 'list'] }),
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
