/* eslint-disable max-len */
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useRevalidator } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/ui/toast';
import { SupabaseError } from '@/errors/classes/SupabaseError';
import { queryClient as globalQueryClient } from '@/config/api/queryClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { supabase } from '@/config/api/supabaseClient';
import { extname } from '@/utils/path/extname';
import { Tables } from '@/types/database';
import { Prettify } from '@/types/utils';
import { hireAgreementDetailsQueryOptions } from '@/features/hires/general/hooks/useHireDetails';
import { settingsQueryOptions } from '@/features/settings/hooks/useSettings';

type RentFormData = Pick<Tables<'rent'>, 'hire_id'>;

export async function addNewRent({ hire_id }: RentFormData) {
  const session = await globalQueryClient.ensureQueryData(sessionOptions());
  const { rent_day } = await globalQueryClient.ensureQueryData(settingsQueryOptions());
  const hireData = await globalQueryClient.ensureQueryData(
    hireAgreementDetailsQueryOptions(hire_id),
  );

  const start_date = '2024-10-01';
  const end_date = '2024-10-01';

  const { data, error, status } = await supabase
    .from('rent')
    .insert({
      hire_id,
      start_date,
      end_date,
      amount: Number(hireData.rent_amount),
    })
    .select('id')
    .limit(1)
    .single();

  if (error) {
    throw new SupabaseError(error, status);
  }

  return data.id;
}

export function useAddNewRent() {
  const queryClient = useQueryClient();
  const { revalidate } = useRevalidator();
  const { toast } = useToast();

  const mutation = useMutation<number, SupabaseError, RentFormData>({
    mutationFn: addNewRent,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['rents', 'list'] });
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
