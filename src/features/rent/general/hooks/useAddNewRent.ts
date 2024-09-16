import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useRevalidator } from 'react-router-dom';
import { useToast } from '@/ui/toast';
import { SupabaseError } from '@/errors/classes/SupabaseError';
import { supabase } from '@/config/api/supabaseClient';
import { AddNewRentTransformedSchema } from '@/features/rent/addNewRent/schemas';

export type AddNewRentFormData = Pick<
  AddNewRentTransformedSchema,
  'hire_id' | 'amount' | 'start_date' | 'end_date'
>;

export async function addNewRent(formData: AddNewRentFormData) {
  const { data, error, status } = await supabase
    .from('rent')
    .insert(formData)
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

  const mutation = useMutation<number, SupabaseError, AddNewRentFormData>({
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
