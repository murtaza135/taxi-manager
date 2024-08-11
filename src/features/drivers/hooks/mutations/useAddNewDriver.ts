/* eslint-disable @typescript-eslint/naming-convention */
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useRevalidator } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/ui/toast';
import { AddNewDriverTransformedSchema } from '@/features/drivers/schemas';
import { SupabaseError } from '@/errors/classes/SupabaseError';
import { queryClient as globalQueryClient } from '@/config/api/queryClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { supabase } from '@/config/api/supabaseClient';

type DocumentPathsObject = {
  picture_path?: string,
  licence_document_path?: string,
  badge_document_path?: string;
};

export async function addNewDriver(formData: AddNewDriverTransformedSchema) {
  const session = await globalQueryClient.ensureQueryData(sessionOptions());
  const documentPaths: DocumentPathsObject = {};
  const { badge_document, licence_document, picture, ...nonFileFormData } = formData;

  if (picture) {
    const { data: storageData } = await supabase
      .storage
      .from('main')
      .upload(
        `${session.user.id}/driver-pictures/${uuidv4()}`,
        picture,
        { upsert: true },
      );

    if (storageData) {
      documentPaths.picture_path = storageData.path;
    }
  }

  if (licence_document) {
    const { data: storageData } = await supabase
      .storage
      .from('main')
      .upload(
        `${session.user.id}/drivers-licences/${uuidv4()}`,
        licence_document,
        { upsert: true },
      );

    if (storageData) {
      documentPaths.licence_document_path = storageData.path;
    }
  }

  if (badge_document) {
    const { data: storageData } = await supabase
      .storage
      .from('main')
      .upload(
        `${session.user.id}/taxi-badges/${uuidv4()}`,
        badge_document,
        { upsert: true },
      );

    if (storageData) {
      documentPaths.badge_document_path = storageData.path;
    }
  }

  const { data: driverId, error, status } = await supabase.rpc(
    'add_new_driver',
    { ...nonFileFormData, ...documentPaths },
  );

  if (error) {
    throw new SupabaseError(error, status, {
      globalTitle: 'Could not add new driver',
    });
  }

  return driverId;
}

export function useAddNewDriver() {
  const queryClient = useQueryClient();
  const { revalidate } = useRevalidator();
  const { toast } = useToast();

  const mutation = useMutation<number, SupabaseError, AddNewDriverTransformedSchema>({
    mutationFn: addNewDriver,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['drivers', 'list'] });
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
