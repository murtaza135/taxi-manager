import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRevalidator } from 'react-router-dom';
import { supabase } from '@/config/api/supabaseClient';
import { queryClient as globalQueryClient } from '@/config/api/queryClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { SupabaseError } from '@/errors/classes/SupabaseError';
import { useToast } from '@/ui/toast';
import { Tables } from '@/types/database';
import { Prettify } from '@/types/utils';

// | 'first_names' | 'last_name' | 'phone_number' | 'email'

export type UpdateDriverVariables = Prettify<
  Partial<
    Pick<
      Tables<'driver'>,
      | 'phone_number' | 'email'
      | 'date_of_birth' | 'national_insurance_number' | 'is_retired'
    >
  > & {
    id: number;
  }
>;

export async function updateDriver({ id, ...vars }: UpdateDriverVariables) {
  const session = await globalQueryClient.ensureQueryData(sessionOptions());

  const { error, status } = await supabase
    .from('driver')
    .update(vars)
    .eq('auth_id', session.user.id)
    .eq('id', id);

  if (error) {
    throw new SupabaseError(error, status, {
      globalTitle: 'Could not update driver',
    });
  }
}

export function useUpdateDriver() {
  const queryClient = useQueryClient();
  const { revalidate } = useRevalidator();
  const { toast } = useToast();

  const mutation = useMutation<void, SupabaseError, UpdateDriverVariables>({
    mutationFn: updateDriver,
    onSuccess: async (_data, { id }) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['drivers', 'list'] }),
        queryClient.invalidateQueries({ queryKey: ['drivers', id] }),
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
