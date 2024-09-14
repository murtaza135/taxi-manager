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
      Tables<'rent'>,
      | 'amount' | 'start_date' | 'end_date'
    >
  > & {
    id: number;
    receipt_document?: File | null | undefined;
  }
>;

export async function updateRent({ id, receipt_document, ...vars }: Variables) {
  const session = await globalQueryClient.ensureQueryData(sessionOptions());

  if (!isEmpty(vars)) {
    const { error, status } = await supabase
      .from('rent')
      .update(vars)
      .eq('auth_id', session.user.id)
      .eq('id', id);

    if (error) {
      throw new SupabaseError(error, status, {
        globalTitle: 'Could not update rent',
      });
    }
  }

  const {
    data: documentsSelectData,
    error: documentsSelectError,
    status: documentsSelectStatus,
  } = await supabase
    .from('rent')
    .select('receipt_document_path')
    .eq('auth_id', session.user.id)
    .eq('id', id)
    .limit(1)
    .single();

  if (documentsSelectError) {
    throw new SupabaseError(documentsSelectError, documentsSelectStatus, {
      globalTitle: 'Could not update rent',
    });
  }

  if (receipt_document) {
    /* add receipt_document */
    const receipt_document_path = `${session.user.id}/rent-receipts/${uuidv4()}${extname(receipt_document.name)}`;

    const { error: documentError } = await supabase
      .storage
      .from('main')
      .upload(receipt_document_path, receipt_document, { upsert: true });

    if (documentError) {
      throw new SupabaseError(documentError, null, {
        globalTitle: 'Could not update rent',
      });
    }

    const { error: documentPathError, status: documentPathStatus } = await supabase
      .from('rent')
      .update({ receipt_document_path })
      .eq('auth_id', session.user.id)
      .eq('id', id);

    if (documentPathError) {
      throw new SupabaseError(documentPathError, documentPathStatus, {
        globalTitle: 'Could not update rent',
      });
    }

    // delete old file if it exists
    if (documentsSelectData.receipt_document_path) {
      await supabase
        .storage
        .from('main')
        .remove([documentsSelectData.receipt_document_path]);
    }
  } else if (
    receipt_document === null
    && documentsSelectData.receipt_document_path
  ) {
    /* delete receipt_document */
    const { error: documentError } = await supabase
      .storage
      .from('main')
      .remove([documentsSelectData.receipt_document_path]);

    if (documentError) {
      throw new SupabaseError(documentError, null, {
        globalTitle: 'Could not update rent',
      });
    }

    const { error: documentPathError, status: documentPathStatus } = await supabase
      .from('rent')
      .update({ receipt_document_path: null })
      .eq('auth_id', session.user.id)
      .eq('id', id);

    if (documentPathError) {
      throw new SupabaseError(documentPathError, documentPathStatus, {
        globalTitle: 'Could not update rent',
      });
    }
  }
}

export function useUpdateRent() {
  const queryClient = useQueryClient();
  const { revalidate } = useRevalidator();
  const { toast } = useToast();

  const mutation = useMutation<void, SupabaseError, Variables>({
    mutationFn: updateRent,
    onSuccess: async (_data, { id, receipt_document }) => {
      if (receipt_document !== undefined) {
        queryClient.removeQueries({ queryKey: ['rents', id, 'receipt'] });
      }

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['rents', 'list'] }),
        queryClient.invalidateQueries({ queryKey: ['rents', id], exact: true }),
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
