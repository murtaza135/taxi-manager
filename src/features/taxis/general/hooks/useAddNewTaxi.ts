import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useRevalidator } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/ui/toast';
import { AddNewTaxiTransformedSchema } from '@/features/taxis/addNewTaxi/schemas';
import { SupabaseError } from '@/errors/classes/SupabaseError';
import { queryClient as globalQueryClient } from '@/config/api/queryClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { supabase } from '@/config/api/supabaseClient';
import { extname } from '@/utils/path/extname';

type TaxiDocumentPathsObject = {
  picture_path?: string;
  logbook_document_path?: string;
  logbook_document2_path?: string;
  compliance_certificate_document_path?: string;
  phc_licence_document_path?: string;
  insurance_document_path?: string;
};

export async function addNewTaxi(formData: AddNewTaxiTransformedSchema) {
  const session = await globalQueryClient.ensureQueryData(sessionOptions());
  const documentPaths: TaxiDocumentPathsObject = {};
  const {
    picture_path: picture,
    logbook_document_path: logbook_document,
    logbook_document2_path: logbook_document2,
    compliance_certificate_document_path: compliance_certificate_document,
    phc_licence_document_path: phc_licence_document,
    insurance_document_path: insurance_document,
    ...nonFileFormData
  } = formData;

  // TODO add storage rollback on error
  if (picture) {
    const fileName = `${session.user.id}/taxi-pictures/${uuidv4()}${extname(picture.name)}`;

    const { data: storageData } = await supabase
      .storage
      .from('main')
      .upload(fileName, picture, { upsert: true });

    if (storageData) {
      documentPaths.picture_path = storageData.path;
    }
  }

  if (logbook_document) {
    const fileName = `${session.user.id}/logbooks/${uuidv4()}${extname(logbook_document.name)}`;

    const { data: storageData } = await supabase
      .storage
      .from('main')
      .upload(fileName, logbook_document, { upsert: true });

    if (storageData) {
      documentPaths.logbook_document_path = storageData.path;
    }
  }

  if (logbook_document2) {
    const fileName = `${session.user.id}/logbooks/${uuidv4()}${extname(logbook_document2.name)}`;

    const { data: storageData } = await supabase
      .storage
      .from('main')
      .upload(fileName, logbook_document2, { upsert: true });

    if (storageData) {
      documentPaths.logbook_document2_path = storageData.path;
    }
  }

  if (compliance_certificate_document) {
    const fileName = `${session.user.id}/taxi-badges/${uuidv4()}${extname(compliance_certificate_document.name)}`;

    const { data: storageData } = await supabase
      .storage
      .from('main')
      .upload(fileName, compliance_certificate_document, { upsert: true });

    if (storageData) {
      documentPaths.compliance_certificate_document_path = storageData.path;
    }
  }

  if (phc_licence_document) {
    const fileName = `${session.user.id}/phc-licences/${uuidv4()}${extname(phc_licence_document.name)}`;

    const { data: storageData } = await supabase
      .storage
      .from('main')
      .upload(fileName, phc_licence_document, { upsert: true });

    if (storageData) {
      documentPaths.phc_licence_document_path = storageData.path;
    }
  }

  if (insurance_document) {
    const fileName = `${session.user.id}/insurance-documents/${uuidv4()}${extname(insurance_document.name)}`;

    const { data: storageData } = await supabase
      .storage
      .from('main')
      .upload(fileName, insurance_document, { upsert: true });

    if (storageData) {
      documentPaths.insurance_document_path = storageData.path;
    }
  }

  const { data: taxiId, error, status } = await supabase.rpc(
    'add_new_taxi',
    { ...nonFileFormData, ...documentPaths },
  );

  if (error) {
    throw new SupabaseError(error, status);
  }

  return taxiId;
}

export function useAddNewTaxi() {
  const queryClient = useQueryClient();
  const { revalidate } = useRevalidator();
  const { toast } = useToast();

  const mutation = useMutation<number, SupabaseError, AddNewTaxiTransformedSchema>({
    mutationFn: addNewTaxi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['taxis', 'list'] });
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
