/* eslint-disable max-len */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRevalidator } from 'react-router-dom';
import { supabase } from '@/config/api/supabaseClient';
import { queryClient as globalQueryClient } from '@/config/api/queryClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { SupabaseError } from '@/errors/classes/SupabaseError';
import { useToast } from '@/ui/toast';

export async function bulkDeleteDriverApplications(ids: string[]) {
  const session = await globalQueryClient.ensureQueryData(sessionOptions());

  const { data, error: selectError, status: selectStatus } = await supabase
    .from('driver_application')
    .select('picture_path, drivers_licence_path, drivers_licence2_path, taxi_badge_path, taxi_badge2_path')
    .eq('auth_id', session.user.id)
    .in('id', ids);

  if (selectError) {
    throw new SupabaseError(selectError, selectStatus, {
      globalTitle: 'Could not delete driver applications',
    });
  }

  const files = data
    .flatMap((obj) => [obj.picture_path, obj.drivers_licence_path, obj.taxi_badge_path, obj.drivers_licence2_path, obj.taxi_badge2_path])
    .filter((file) => !!file) as string[];

  if (files.length > 0) {
    const { error: storageError } = await supabase
      .storage
      .from('main')
      .remove(files);

    if (storageError) {
      throw new SupabaseError(storageError, null, {
        globalTitle: 'Could not delete driver application',
      });
    }
  }

  const { error, status } = await supabase
    .from('driver_application')
    .delete()
    .eq('auth_id', session.user.id)
    .in('id', ids);

  if (error) {
    throw new SupabaseError(error, status, {
      globalTitle: 'Could not delete driver application',
    });
  }
}

export function useBulkDeleteDriverApplications() {
  const queryClient = useQueryClient();
  const { revalidate } = useRevalidator();
  const { toast } = useToast();

  const mutation = useMutation<void, SupabaseError, string[]>({
    mutationFn: bulkDeleteDriverApplications,
    onSuccess: async (_data, ids) => {
      const queryInvalidations = ids.map((id) => (
        queryClient.invalidateQueries({ queryKey: ['driverApplications', id], exact: true })
      ));

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['driverApplications', 'list'] }),
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
