import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useRevalidator } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/ui/toast';
import { AddNewTaxiLicenceDetailsSchema } from '@/features/taxis/addNewTaxi/schemas';
import { SupabaseError } from '@/errors/classes/SupabaseError';
import { queryClient as globalQueryClient } from '@/config/api/queryClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { supabase } from '@/config/api/supabaseClient';
import { extname } from '@/utils/path/extname';
import { CreateObjectTransformer } from '@/utils/transformer';

type TaxiDocumentPathsObject = {
  compliance_certificate_document_path?: string;
  phc_licence_document_path?: string;
};

type Variables = CreateObjectTransformer<AddNewTaxiLicenceDetailsSchema> & {
  taxi_id: number;
};

export async function attachLicenceToTaxi(variables: Variables) {
  const session = await globalQueryClient.ensureQueryData(sessionOptions());

  const documentPaths: TaxiDocumentPathsObject = {};
  const {
    compliance_certificate_document_path: compliance_certificate_document,
    phc_licence_document_path: phc_licence_document,
    taxi_id,
    ...nonFileFormData
  } = variables;

  // TODO add storage rollback on error
  if (compliance_certificate_document) {
    const fileName = `${session.user.id}/compliance-certificates/${uuidv4()}${extname(compliance_certificate_document.name)}`;

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

  const { data: licenceData, error: licenceError, status: licenceStatus } = await supabase
    .from('taxi_licence')
    .insert({
      taxi_id,
      compliance_certificate_licence_number: nonFileFormData.compliance_certificate_licence_number,
      phc_number: nonFileFormData.phc_number,
      start_date: nonFileFormData.taxi_licence_start_date,
      end_date: nonFileFormData.taxi_licence_end_date,
      compliance_certificate_document_path: documentPaths.compliance_certificate_document_path,
      phc_licence_document_path: documentPaths.phc_licence_document_path,
    })
    .eq('auth_id', session.user.id)
    .select('id')
    .limit(1)
    .single();

  if (licenceError) {
    throw new SupabaseError(licenceError, licenceStatus);
  }

  const { error: taxiLinkError, status: taxiLinkStatus } = await supabase
    .from('taxi')
    .update({ active_taxi_licence_id: licenceData.id })
    .eq('auth_id', session.user.id)
    .eq('id', taxi_id);

  if (taxiLinkError) {
    throw new SupabaseError(taxiLinkError, taxiLinkStatus);
  }

  return taxi_id;
}

export function useAttachLicenceToTaxi() {
  const queryClient = useQueryClient();
  const { revalidate } = useRevalidator();
  const { toast } = useToast();

  const mutation = useMutation<number, SupabaseError, Variables>({
    mutationFn: attachLicenceToTaxi,
    onSuccess: async (_data, { taxi_id }) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['taxis', 'list'] }),
        queryClient.invalidateQueries({ queryKey: ['taxis', taxi_id, 'licence'], exact: true }),
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
