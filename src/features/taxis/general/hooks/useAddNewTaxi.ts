import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useRevalidator } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/ui/toast';
import { AddNewTaxiTransformedSchema } from '@/features/taxis/addNewTaxi/schemas';
import { SupabaseError } from '@/errors/classes/SupabaseError';
import { queryClient as globalQueryClient } from '@/config/api/queryClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { supabase } from '@/config/api/supabaseClient';
import { compressImage } from '@/utils/compression/compressImage';
import { extname } from '@/utils/path/extname';

type TaxiDocumentPathsObject = {
  picture_path?: string;
  logbook_document_path?: string;
  compliance_certificate_document_path?: string;
  phc_licence_document_path?: string;
  insurance_document_path?: string;
};

export async function addNewTaxi(formData: AddNewTaxiTransformedSchema) {
  const session = await globalQueryClient.ensureQueryData(sessionOptions());
  const documentPaths: TaxiDocumentPathsObject = {};
  const {
    picture_path,
    logbook_document_path,
    compliance_certificate_document_path,
    phc_licence_document_path,
    insurance_document_path,
    ...nonFileFormData
  } = formData;

  // TODO add storage rollback on error
  if (picture_path) {
    const compressedPicture = await compressImage(
      picture_path,
      { maxWidth: 150, maxHeight: 150 },
    );

    const fileName = `${session.user.id}/taxi-pictures/${uuidv4()}${extname(compressedPicture.name)}`;

    const { data: storageData } = await supabase
      .storage
      .from('main')
      .upload(fileName, compressedPicture, { upsert: true });

    if (storageData) {
      documentPaths.picture_path = storageData.path;
    }
  }

  if (logbook_document_path) {
    const compressedLogbookDocument = await compressImage(
      logbook_document_path,
      { maxWidth: 500, maxHeight: 500 },
    );

    const fileName = `${session.user.id}/logbooks/${uuidv4()}${extname(compressedLogbookDocument.name)}`;

    const { data: storageData } = await supabase
      .storage
      .from('main')
      .upload(fileName, compressedLogbookDocument, { upsert: true });

    if (storageData) {
      documentPaths.logbook_document_path = storageData.path;
    }
  }

  if (compliance_certificate_document_path) {
    const compressedComplianceCertificateDocument = await compressImage(
      compliance_certificate_document_path,
      { maxWidth: 500, maxHeight: 500 },
    );

    const fileName = `${session.user.id}/taxi-badges/${uuidv4()}${extname(compressedComplianceCertificateDocument.name)}`;

    const { data: storageData } = await supabase
      .storage
      .from('main')
      .upload(fileName, compressedComplianceCertificateDocument, { upsert: true });

    if (storageData) {
      documentPaths.compliance_certificate_document_path = storageData.path;
    }
  }

  if (phc_licence_document_path) {
    const compressedPHCLicenceDocument = await compressImage(
      phc_licence_document_path,
      { maxWidth: 500, maxHeight: 500 },
    );

    const fileName = `${session.user.id}/phc-licences/${uuidv4()}${extname(compressedPHCLicenceDocument.name)}`;

    const { data: storageData } = await supabase
      .storage
      .from('main')
      .upload(fileName, compressedPHCLicenceDocument, { upsert: true });

    if (storageData) {
      documentPaths.phc_licence_document_path = storageData.path;
    }
  }

  if (insurance_document_path) {
    const compressedInsuranceDocument = await compressImage(
      insurance_document_path,
      { maxWidth: 500, maxHeight: 500 },
    );

    const fileName = `${session.user.id}/insurance-documents/${uuidv4()}${extname(compressedInsuranceDocument.name)}`;

    const { data: storageData } = await supabase
      .storage
      .from('main')
      .upload(fileName, compressedInsuranceDocument, { upsert: true });

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
