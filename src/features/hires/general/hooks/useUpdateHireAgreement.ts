import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRevalidator } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import isEmpty from 'lodash/isEmpty';
import { supabase } from '@/config/api/supabaseClient';
import { queryClient as globalQueryClient } from '@/config/api/queryClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { SupabaseError } from '@/errors/classes/SupabaseError';
import { useToast } from '@/ui/toast';
import { Tables } from '@/types/database';
import { Prettify } from '@/types/utils';
import { extname } from '@/utils/path/extname';

// TODO make simpler

export type Variables = Prettify<
  Partial<
    Pick<
      Tables<'hire_agreement'>,
      | 'rent_amount' | 'deposit_amount' | 'start_date' | 'end_date' | 'is_retired'
    >
  > & {
    id: number;
    permission_letter_document?: File | null | undefined;
    contract_document?: File | null | undefined;
    deposit_receipt_document?: File | null | undefined;
  }
>;

export async function updateHireAgreementDetails({
  id,
  permission_letter_document,
  contract_document,
  deposit_receipt_document,
  ...vars
}: Variables) {
  const session = await globalQueryClient.ensureQueryData(sessionOptions());

  if (!isEmpty(vars)) {
    const { error, status } = await supabase
      .from('hire_agreement')
      .update(vars)
      .eq('auth_id', session.user.id)
      .eq('id', id);

    if (error) {
      throw new SupabaseError(error, status, {
        globalTitle: 'Could not update hire agreement',
      });
    }
  }

  const {
    data: documentsSelectData,
    error: documentsSelectError,
    status: documentsSelectStatus,
  } = await supabase
    .from('hire_agreement')
    .select('permission_letter_document_path, contract_document_path, deposit_receipt_document_path')
    .eq('auth_id', session.user.id)
    .eq('id', id)
    .limit(1)
    .single();

  if (documentsSelectError) {
    throw new SupabaseError(documentsSelectError, documentsSelectStatus, {
      globalTitle: 'Could not update hire agreement',
    });
  }

  if (permission_letter_document) {
    /* add permission_letter_document */
    const permission_letter_document_path = `${session.user.id}/permission-letters/${uuidv4()}${extname(permission_letter_document.name)}`;

    const { error: pictureError } = await supabase
      .storage
      .from('main')
      .upload(permission_letter_document_path, permission_letter_document, { upsert: true });

    if (pictureError) {
      throw new SupabaseError(pictureError, null, {
        globalTitle: 'Could not update hire agreement',
      });
    }

    const { error: picturePathError, status: picturePathStatus } = await supabase
      .from('hire_agreement')
      .update({ permission_letter_document_path })
      .eq('auth_id', session.user.id)
      .eq('id', id);

    if (picturePathError) {
      throw new SupabaseError(picturePathError, picturePathStatus, {
        globalTitle: 'Could not update hire agreement',
      });
    }

    // delete old file if it exists
    if (documentsSelectData.permission_letter_document_path) {
      await supabase
        .storage
        .from('main')
        .remove([documentsSelectData.permission_letter_document_path]);
    }
  } else if (
    permission_letter_document === null
    && documentsSelectData.permission_letter_document_path
  ) {
    /* delete permission_letter_document */
    const { error: pictureError } = await supabase
      .storage
      .from('main')
      .remove([documentsSelectData.permission_letter_document_path]);

    if (pictureError) {
      throw new SupabaseError(pictureError, null, {
        globalTitle: 'Could not update hire agreement',
      });
    }

    const { error: picturePathError, status: picturePathStatus } = await supabase
      .from('hire_agreement')
      .update({ permission_letter_document_path: null })
      .eq('auth_id', session.user.id)
      .eq('id', id);

    if (picturePathError) {
      throw new SupabaseError(picturePathError, picturePathStatus, {
        globalTitle: 'Could not update hire agreement',
      });
    }
  }

  if (contract_document) {
    /* add contract_document */
    const contract_document_path = `${session.user.id}/hire-contracts/${uuidv4()}${extname(contract_document.name)}`;

    const { error: contractError } = await supabase
      .storage
      .from('main')
      .upload(contract_document_path, contract_document, { upsert: true });

    if (contractError) {
      throw new SupabaseError(contractError, null, {
        globalTitle: 'Could not update hire agreement',
      });
    }

    const { error: contractPathError, status: contractPathStatus } = await supabase
      .from('hire_agreement')
      .update({ contract_document_path })
      .eq('auth_id', session.user.id)
      .eq('id', id);

    if (contractPathError) {
      throw new SupabaseError(contractPathError, contractPathStatus, {
        globalTitle: 'Could not update hire agreement',
      });
    }

    // delete old file if it exists
    if (documentsSelectData.contract_document_path) {
      await supabase
        .storage
        .from('main')
        .remove([documentsSelectData.contract_document_path]);
    }
  } else if (contract_document === null && documentsSelectData.contract_document_path) {
    /* delete contract */
    const { error: contractError } = await supabase
      .storage
      .from('main')
      .remove([documentsSelectData.contract_document_path]);

    if (contractError) {
      throw new SupabaseError(contractError, null, {
        globalTitle: 'Could not update hire agreement',
      });
    }

    const { error: contractPathError, status: contractPathStatus } = await supabase
      .from('hire_agreement')
      .update({ contract_document_path: null })
      .eq('auth_id', session.user.id)
      .eq('id', id);

    if (contractPathError) {
      throw new SupabaseError(contractPathError, contractPathStatus, {
        globalTitle: 'Could not update hire agreement',
      });
    }
  }

  if (deposit_receipt_document) {
    /* add deposit_receipt_document */
    const deposit_receipt_document_path = `${session.user.id}/deposit-receipts/${uuidv4()}${extname(deposit_receipt_document.name)}`;

    const { error: contractError } = await supabase
      .storage
      .from('main')
      .upload(deposit_receipt_document_path, deposit_receipt_document, { upsert: true });

    if (contractError) {
      throw new SupabaseError(contractError, null, {
        globalTitle: 'Could not update hire agreement',
      });
    }

    const { error: contractPathError, status: contractPathStatus } = await supabase
      .from('hire_agreement')
      .update({ deposit_receipt_document_path })
      .eq('auth_id', session.user.id)
      .eq('id', id);

    if (contractPathError) {
      throw new SupabaseError(contractPathError, contractPathStatus, {
        globalTitle: 'Could not update hire agreement',
      });
    }

    // delete old file if it exists
    if (documentsSelectData.deposit_receipt_document_path) {
      await supabase
        .storage
        .from('main')
        .remove([documentsSelectData.deposit_receipt_document_path]);
    }
  } else if (
    deposit_receipt_document === null
    && documentsSelectData.deposit_receipt_document_path
  ) {
    /* delete deposit receipt */
    const { error: depositReceiptError } = await supabase
      .storage
      .from('main')
      .remove([documentsSelectData.deposit_receipt_document_path]);

    if (depositReceiptError) {
      throw new SupabaseError(depositReceiptError, null, {
        globalTitle: 'Could not update hire agreement',
      });
    }

    const { error: depositReceiptPathError, status: depositReceiptPathStatus } = await supabase
      .from('hire_agreement')
      .update({ deposit_receipt_document_path: null })
      .eq('auth_id', session.user.id)
      .eq('id', id);

    if (depositReceiptPathError) {
      throw new SupabaseError(depositReceiptPathError, depositReceiptPathStatus, {
        globalTitle: 'Could not update hire agreement',
      });
    }
  }
}

export function useUpdateHireAgreementDetails() {
  const queryClient = useQueryClient();
  const { revalidate } = useRevalidator();
  const { toast } = useToast();

  const mutation = useMutation<void, SupabaseError, Variables>({
    mutationFn: updateHireAgreementDetails,
    onSuccess: async (_data, {
      id,
      permission_letter_document,
      contract_document,
      deposit_receipt_document,
    }) => {
      if (permission_letter_document !== undefined) {
        queryClient.removeQueries({ queryKey: ['hires', id, 'details', 'permissionLetter'] });
      }

      if (contract_document !== undefined) {
        queryClient.removeQueries({ queryKey: ['hires', id, 'details', 'contract'] });
      }

      if (deposit_receipt_document !== undefined) {
        queryClient.removeQueries({ queryKey: ['hires', id, 'details', 'depositReceipt'] });
      }

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['hires', 'list'] }),
        queryClient.invalidateQueries({ queryKey: ['hires', id, 'details'], exact: true }),
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
