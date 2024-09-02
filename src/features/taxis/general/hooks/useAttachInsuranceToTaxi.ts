import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useRevalidator } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/ui/toast';
import { AddNewTaxiInsuranceSchema } from '@/features/taxis/addNewTaxi/schemas';
import { SupabaseError } from '@/errors/classes/SupabaseError';
import { queryClient as globalQueryClient } from '@/config/api/queryClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { supabase } from '@/config/api/supabaseClient';
import { extname } from '@/utils/path/extname';
import { CreateObjectTransformer } from '@/utils/transformer';

type TaxiDocumentPathsObject = {
  insurance_document_path?: string;
};

type Variables = CreateObjectTransformer<AddNewTaxiInsuranceSchema> & {
  taxi_id: number;
};

export async function attachInsuranceToTaxi(variables: Variables) {
  const session = await globalQueryClient.ensureQueryData(sessionOptions());

  const documentPaths: TaxiDocumentPathsObject = {};
  const {
    insurance_document_path: insurance_document,
    taxi_id,
    ...nonFileFormData
  } = variables;

  // TODO add storage rollback on error
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

  const { data: insuranceData, error: insuranceError, status: insuranceStatus } = await supabase
    .from('insurance')
    .insert({
      taxi_id,
      policy_number: nonFileFormData.policy_number,
      is_any_driver: nonFileFormData.is_any_driver,
      start_date: nonFileFormData.insurance_start_date,
      end_date: nonFileFormData.insurance_end_date,
      document_path: documentPaths.insurance_document_path,
    })
    .eq('auth_id', session.user.id)
    .select('id')
    .limit(1)
    .single();

  if (insuranceError) {
    throw new SupabaseError(insuranceError, insuranceStatus);
  }

  const { error: taxiLinkError, status: taxiLinkStatus } = await supabase
    .from('taxi')
    .update({ active_insurance_id: insuranceData.id })
    .eq('auth_id', session.user.id)
    .eq('id', taxi_id);

  if (taxiLinkError) {
    throw new SupabaseError(taxiLinkError, taxiLinkStatus);
  }

  return taxi_id;
}

export function useAttachInsuranceToTaxi() {
  const queryClient = useQueryClient();
  const { revalidate } = useRevalidator();
  const { toast } = useToast();

  const mutation = useMutation<number, SupabaseError, Variables>({
    mutationFn: attachInsuranceToTaxi,
    onSuccess: async (_data, { taxi_id }) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['taxis', 'list'] }),
        queryClient.invalidateQueries({ queryKey: ['taxis', taxi_id, 'insurance'], exact: true }),
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
