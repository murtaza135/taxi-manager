/* eslint-disable max-len */
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useRevalidator } from 'react-router-dom';
import pick from 'lodash/pick';
import { useToast } from '@/ui/toast';
import { SupabaseError } from '@/errors/classes/SupabaseError';
import { queryClient as globalQueryClient } from '@/config/api/queryClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { supabase } from '@/config/api/supabaseClient';
import { NonNullableObject, Prettify } from '@/types/utils';
import { Database } from '@/types/database';

async function moveDocumentToUserFolder(path: string, userId: string) {
  if (path.startsWith('guest')) {
    const toPath = path.replace('guest', userId);

    const { error } = await supabase
      .storage
      .from('main')
      .move(path, toPath);

    return error ? path : toPath;
  }

  return path;
}

export type Variables = Prettify<
  NonNullableObject<Database['public']['Functions']['add_new_driver']['Args']> & {
    id: string;
  }
>;

export async function convertDriverApplicationToDriver(formData: Variables) {
  const session = await globalQueryClient.ensureQueryData(sessionOptions());
  const userId = session.user.id;
  const { id, ...restFormData } = formData;
  const picture_path = await moveDocumentToUserFolder(formData.picture_path, userId);
  const licence_document_path = await moveDocumentToUserFolder(formData.licence_document_path, userId);
  const licence_document2_path = await moveDocumentToUserFolder(formData.licence_document2_path, userId);
  const badge_document_path = await moveDocumentToUserFolder(formData.badge_document_path, userId);
  const badge_document2_path = await moveDocumentToUserFolder(formData.badge_document2_path, userId);

  const submissionData = pick(restFormData, [
    'badge_end_date',
    'badge_number',
    'badge_start_date',
    'date_of_birth',
    'email',
    'name',
    'phone_number',
    'national_insurance_number',
    'licence_end_date',
    'licence_number',
    'licence_start_date',
  ]);

  const { data: driverId, error, status } = await supabase.rpc(
    'add_new_driver',
    { ...submissionData, picture_path, licence_document_path, licence_document2_path, badge_document_path, badge_document2_path },
  );

  if (error) {
    throw new SupabaseError(error, status);
  }

  const { error: deleteApplicationError, status: deleteApplicationStatus } = await supabase
    .from('driver_application')
    .delete()
    .eq('id', id);

  if (deleteApplicationError) {
    throw new SupabaseError(deleteApplicationError, deleteApplicationStatus);
  }

  return driverId;
}

export function useConvertDriverApplicationToDriver() {
  const queryClient = useQueryClient();
  const { revalidate } = useRevalidator();
  const { toast } = useToast();

  const mutation = useMutation<number, SupabaseError, Variables>({
    mutationFn: convertDriverApplicationToDriver,
    onSuccess: async (_data, { id }) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['drivers', 'list'] }),
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
