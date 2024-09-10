import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useRevalidator } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/ui/toast';
import { AddNewHireAgreementTransformedSchema } from '@/features/hires/addNewHire/schemas';
import { SupabaseError } from '@/errors/classes/SupabaseError';
import { queryClient as globalQueryClient } from '@/config/api/queryClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { supabase } from '@/config/api/supabaseClient';
import { extname } from '@/utils/path/extname';

type HireAgreementDocumentPathsObject = {
  permission_letter_document_path?: string;
  contract_document_path?: string;
  deposit_receipt_document_path?: string;
};

export async function addNewHireAgreement(formData: AddNewHireAgreementTransformedSchema) {
  const session = await globalQueryClient.ensureQueryData(sessionOptions());
  const documentPaths: HireAgreementDocumentPathsObject = {};
  const {
    permission_letter_document_path: permission_letter_document,
    contract_document_path: contract_document,
    deposit_receipt_document_path: deposit_receipt_document,
    ...nonFileFormData
  } = formData;

  // TODO add storage rollback on error
  if (permission_letter_document) {
    const fileName = `${session.user.id}/permission-letters/${uuidv4()}${extname(permission_letter_document.name)}`;

    const { data: storageData } = await supabase
      .storage
      .from('main')
      .upload(fileName, permission_letter_document, { upsert: true });

    if (storageData) {
      documentPaths.permission_letter_document_path = storageData.path;
    }
  }

  if (contract_document) {
    const fileName = `${session.user.id}/hire-contracts/${uuidv4()}${extname(contract_document.name)}`;

    const { data: storageData } = await supabase
      .storage
      .from('main')
      .upload(fileName, contract_document, { upsert: true });

    if (storageData) {
      documentPaths.contract_document_path = storageData.path;
    }
  }

  if (deposit_receipt_document) {
    const fileName = `${session.user.id}/deposit-receipts/${uuidv4()}${extname(deposit_receipt_document.name)}`;

    const { data: storageData } = await supabase
      .storage
      .from('main')
      .upload(fileName, deposit_receipt_document, { upsert: true });

    if (storageData) {
      documentPaths.deposit_receipt_document_path = storageData.path;
    }
  }

  const { data: hireAgreementId, error, status } = await supabase.rpc(
    'add_new_hire_agreement',
    {
      ...documentPaths,
      taxi_id: nonFileFormData.taxi_id,
      driver_id: nonFileFormData.driver_id,
      rent_amount: nonFileFormData.rent_amount,
      deposit_amount: nonFileFormData.deposit_amount,
      start_date: nonFileFormData.start_date,
      end_date: nonFileFormData.end_date,
    },
  );

  if (error) {
    throw new SupabaseError(error, status);
  }

  return hireAgreementId;
}

export function useAddNewHireAgreement() {
  const queryClient = useQueryClient();
  const { revalidate } = useRevalidator();
  const { toast } = useToast();

  const mutation = useMutation<number, SupabaseError, AddNewHireAgreementTransformedSchema>({
    mutationFn: addNewHireAgreement,
    onSuccess: async (_data, { taxi_id, driver_id }) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['hires', 'list'] }),
        queryClient.invalidateQueries({ queryKey: ['drivers', 'list'] }),
        queryClient.invalidateQueries({ queryKey: ['drivers', driver_id, 'details'], exact: true }),
        queryClient.invalidateQueries({ queryKey: ['taxis', 'list'] }),
        queryClient.invalidateQueries({ queryKey: ['taxis', taxi_id, 'details'], exact: true }),

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
