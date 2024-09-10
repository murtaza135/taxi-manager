import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useRevalidator } from 'react-router-dom';
import { useToast } from '@/ui/toast';
import { CreateDriverApplicationSchema } from '@/features/drivers/addNewDriverApplication/schemas';
import { SupabaseError } from '@/errors/classes/SupabaseError';
import { supabase } from '@/config/api/supabaseClient';

// TODO setup company feature
const company_id = 1;

export async function createDriverApplication({ name }: CreateDriverApplicationSchema) {
  const { data, error, status } = await supabase
    .from('driver_application')
    .insert({ name, company_id })
    .select('id')
    .limit(1)
    .single();

  if (error) {
    throw new SupabaseError(error, status);
  }

  return data.id;
}

export function useCreateDriverApplication() {
  const queryClient = useQueryClient();
  const { revalidate } = useRevalidator();
  const { toast } = useToast();

  const mutation = useMutation<string, SupabaseError, CreateDriverApplicationSchema>({
    mutationFn: createDriverApplication,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['driverApplications', 'list'] });
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
