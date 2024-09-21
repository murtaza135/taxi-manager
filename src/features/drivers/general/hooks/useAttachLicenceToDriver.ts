import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useRevalidator } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/ui/toast';
import { AddNewDriversLicenceSchema } from '@/features/drivers/addNewDriver/schemas';
import { SupabaseError } from '@/errors/classes/SupabaseError';
import { queryClient as globalQueryClient } from '@/config/api/queryClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { supabase } from '@/config/api/supabaseClient';
import { extname } from '@/utils/path/extname';
import { CreateObjectTransformer } from '@/utils/transformer';

type DriverDocumentPathsObject = {
  licence_document?: string;
  licence_document2?: string;
};

type Variables = CreateObjectTransformer<AddNewDriversLicenceSchema> & {
  driver_id: number;
};

export async function attachLicenceToDriver(variables: Variables) {
  const session = await globalQueryClient.ensureQueryData(sessionOptions());

  const documentPaths: DriverDocumentPathsObject = {};
  const {
    licence_document,
    licence_document2,
    driver_id,
    ...nonFileFormData
  } = variables;

  // TODO add storage rollback on error
  if (licence_document) {
    const fileName = `${session.user.id}/drivers-licences/${uuidv4()}${extname(licence_document.name)}`;

    const { data: storageData } = await supabase
      .storage
      .from('main')
      .upload(fileName, licence_document, { upsert: true });

    if (storageData) {
      documentPaths.licence_document = storageData.path;
    }
  }

  if (licence_document2) {
    const fileName = `${session.user.id}/drivers-licences/${uuidv4()}${extname(licence_document2.name)}`;

    const { data: storageData } = await supabase
      .storage
      .from('main')
      .upload(fileName, licence_document2, { upsert: true });

    if (storageData) {
      documentPaths.licence_document2 = storageData.path;
    }
  }

  const { data: licenceData, error: licenceError, status: licenceStatus } = await supabase
    .from('drivers_licence')
    .insert({
      driver_id,
      licence_number: nonFileFormData.licence_number,
      start_date: nonFileFormData.licence_start_date,
      end_date: nonFileFormData.licence_end_date,
      document_path: documentPaths.licence_document,
      document2_path: documentPaths.licence_document,
    })
    .eq('auth_id', session.user.id)
    .select('id')
    .limit(1)
    .single();

  if (licenceError) {
    throw new SupabaseError(licenceError, licenceStatus);
  }

  const { error: driverLinkError, status: driverLinkStatus } = await supabase
    .from('driver')
    .update({ active_drivers_licence_id: licenceData.id })
    .eq('auth_id', session.user.id)
    .eq('id', driver_id);

  if (driverLinkError) {
    throw new SupabaseError(driverLinkError, driverLinkStatus);
  }

  return driver_id;
}

export function useAttachLicenceToDriver() {
  const queryClient = useQueryClient();
  const { revalidate } = useRevalidator();
  const { toast } = useToast();

  const mutation = useMutation<number, SupabaseError, Variables>({
    mutationFn: attachLicenceToDriver,
    onSuccess: async (_data, { driver_id }) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['drivers', 'list'] }),
        queryClient.invalidateQueries({ queryKey: ['drivers', driver_id, 'licence'], exact: true }),
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
