import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRevalidator } from 'react-router-dom';
import { supabase } from '@/config/api/supabaseClient';
import { queryClient as globalQueryClient } from '@/config/api/queryClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { SupabaseError } from '@/errors/classes/SupabaseError';
import { useToast } from '@/ui/toast';
import { rentQueryOptions } from '@/features/rent/general/hooks/useRent';

export async function deleteRent(id: number) {
  const session = await globalQueryClient.ensureQueryData(sessionOptions());

  const data = await globalQueryClient.ensureQueryData(rentQueryOptions(id));
  const { receipt_document_path } = data;

  if (receipt_document_path) {
    const { error: storageError } = await supabase
      .storage
      .from('main')
      .remove([receipt_document_path]);

    if (storageError) {
      throw new SupabaseError(storageError, null, {
        globalTitle: 'Could not delete rent',
      });
    }
  }

  const { error, status } = await supabase
    .from('rent')
    .delete()
    .eq('auth_id', session.user.id)
    .eq('id', id);

  if (error) {
    throw new SupabaseError(error, status, {
      globalTitle: 'Could not delete rent application',
    });
  }
}

export function useDeleteRent() {
  const queryClient = useQueryClient();
  const { revalidate } = useRevalidator();
  const { toast } = useToast();

  const mutation = useMutation<void, SupabaseError, number>({
    mutationFn: deleteRent,
    onSuccess: async (_data, id) => {
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
