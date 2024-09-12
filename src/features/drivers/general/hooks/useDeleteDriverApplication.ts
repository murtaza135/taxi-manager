import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRevalidator } from 'react-router-dom';
import { supabase } from '@/config/api/supabaseClient';
import { queryClient as globalQueryClient } from '@/config/api/queryClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { SupabaseError } from '@/errors/classes/SupabaseError';
import { useToast } from '@/ui/toast';
import { driverApplicationQueryOptions } from '@/features/drivers/general/hooks/useDriverApplication';

export async function deleteDriverApplication(id: string) {
  const session = await globalQueryClient.ensureQueryData(sessionOptions());

  const data = await globalQueryClient.ensureQueryData(driverApplicationQueryOptions(id));
  const { picture_path, taxi_badge_path, drivers_licence_path } = data;
  const files = [picture_path, taxi_badge_path, drivers_licence_path]
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
    .eq('id', id);

  if (error) {
    throw new SupabaseError(error, status, {
      globalTitle: 'Could not delete driver application',
    });
  }
}

export function useDeleteDriverApplication() {
  const queryClient = useQueryClient();
  const { revalidate } = useRevalidator();
  const { toast } = useToast();

  const mutation = useMutation<void, SupabaseError, string>({
    mutationFn: deleteDriverApplication,
    onSuccess: async (_data, id) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['driverApplications', 'list'] }),
        queryClient.invalidateQueries({ queryKey: ['driverApplications', id], exact: true }),
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
