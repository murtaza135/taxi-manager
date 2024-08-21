import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useRevalidator } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/ui/toast';
import { AddNewDriverTransformedSchema } from '@/features/drivers/addNewDriver/schemas';
import { SupabaseError } from '@/errors/classes/SupabaseError';
import { queryClient as globalQueryClient } from '@/config/api/queryClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { supabase } from '@/config/api/supabaseClient';
import { compressImage } from '@/utils/compression/compressImage';

type DriverDocumentPathsObject = {
  picture_path?: string,
  licence_document_path?: string,
  badge_document_path?: string;
};

export async function addNewDriver(formData: AddNewDriverTransformedSchema) {
  const session = await globalQueryClient.ensureQueryData(sessionOptions());
  const documentPaths: DriverDocumentPathsObject = {};
  const { badge_document, licence_document, picture, ...nonFileFormData } = formData;

  // TODO add storage rollback on error
  if (picture) {
    const compressedPicture = await compressImage(
      picture,
      { maxWidth: 150, maxHeight: 150 },
    );

    const { data: storageData } = await supabase
      .storage
      .from('main')
      .upload(
        `${session.user.id}/driver-pictures/${uuidv4()}`,
        compressedPicture,
        { upsert: true },
      );

    if (storageData) {
      documentPaths.picture_path = storageData.path;
    }
  }

  if (licence_document) {
    const compressedLicenceDocument = await compressImage(
      licence_document,
      { maxWidth: 500, maxHeight: 500 },
    );

    const { data: storageData } = await supabase
      .storage
      .from('main')
      .upload(
        `${session.user.id}/drivers-licences/${uuidv4()}`,
        compressedLicenceDocument,
        { upsert: true },
      );

    if (storageData) {
      documentPaths.licence_document_path = storageData.path;
    }
  }

  if (badge_document) {
    const compressedBadgeDocument = await compressImage(
      badge_document,
      { maxWidth: 500, maxHeight: 500 },
    );

    const { data: storageData } = await supabase
      .storage
      .from('main')
      .upload(
        `${session.user.id}/taxi-badges/${uuidv4()}`,
        compressedBadgeDocument,
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
    throw new SupabaseError(error, status);
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
