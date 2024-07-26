import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRevalidator } from 'react-router-dom';
import { supabase } from '@/config/api/supabaseClient';
import { queryClient as globalQueryClient } from '@/config/api/queryClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { SupabaseError } from '@/errors/classes/SupabaseError';
import { useToast } from '@/ui/toast';

export type SetDriversRetirementsVariables = {
  ids: number[];
  isRetired: boolean;
};

export async function setDriversRetirements({
  ids,
  isRetired,
}: SetDriversRetirementsVariables) {
  const session = await globalQueryClient.ensureQueryData(sessionOptions());

  // TODO replace with sql function for bulk update? https://github.com/supabase/postgrest-js/issues/174#issuecomment-819919742
  const responses = await Promise.all(
    ids.map((id) => (
      supabase
        .from('driver')
        .update({ is_retired: isRetired })
        .eq('auth_id', session.user.id)
        .eq('id', id)
    )),
  );

  const responseWithError = responses.find(({ error }) => !!error);

  if (responseWithError && responseWithError.error) {
    const { error, status } = responseWithError;
    throw new SupabaseError(error, status, {
      globalTitle: isRetired
        ? 'Could not retire some drivers'
        : 'Could not recover some drivers',
    });
  }

  return null;
}

export function useSetDriversRetirements() {
  const queryClient = useQueryClient();
  const { revalidate } = useRevalidator();
  const { toast } = useToast();

  const mutation = useMutation<null, SupabaseError, SetDriversRetirementsVariables>({
    mutationFn: setDriversRetirements,
    onSuccess: async (_data, { ids }) => {
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
