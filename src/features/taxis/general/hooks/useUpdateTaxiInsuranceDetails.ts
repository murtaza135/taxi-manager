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
      Tables<'insurance'>,
      | 'policy_number' | 'is_any_driver' | 'start_date' | 'end_date'
    >
  > & {
    id: number;
    taxi_id: number;
    insurance?: File | null | undefined;
  }
>;

export async function updateTaxiInsuranceDetails({ id, insurance, ...vars }: Variables) {
  const session = await globalQueryClient.ensureQueryData(sessionOptions());

  if (!isEmpty(vars)) {
    const { error, status } = await supabase
      .from('insurance')
      .update(vars)
      .eq('auth_id', session.user.id)
      .eq('id', id);

    if (error) {
      throw new SupabaseError(error, status, {
        globalTitle: 'Could not update taxi insurance',
      });
    }
  }

  const {
    data: documentsSelectData,
    error: documentsSelectError,
    status: documentsSelectStatus,
  } = await supabase
    .from('insurance')
    .select('document_path')
    .eq('auth_id', session.user.id)
    .eq('id', id)
    .limit(1)
    .single();

  if (documentsSelectError) {
    throw new SupabaseError(documentsSelectError, documentsSelectStatus, {
      globalTitle: 'Could not update taxi insurance',
    });
  }

  if (insurance) {
    /* add insurance */
    const document_path = `${session.user.id}/insurance-documents/${uuidv4()}${extname(insurance.name)}`;

    const { error: documentError } = await supabase
      .storage
      .from('main')
      .upload(document_path, insurance, { upsert: true });

    if (documentError) {
      throw new SupabaseError(documentError, null, {
        globalTitle: 'Could not update taxi insurance',
      });
    }

    const { error: documentPathError, status: documentPathStatus } = await supabase
      .from('insurance')
      .update({ document_path })
      .eq('auth_id', session.user.id)
      .eq('id', id);

    if (documentPathError) {
      throw new SupabaseError(documentPathError, documentPathStatus, {
        globalTitle: 'Could not update taxi insurance',
      });
    }

    // delete old file if it exists
    if (documentsSelectData.document_path) {
      await supabase
        .storage
        .from('main')
        .remove([documentsSelectData.document_path]);
    }
  } else if (insurance === null && documentsSelectData.document_path) {
    /* delete insurance */
    const { error: documentError } = await supabase
      .storage
      .from('main')
      .remove([documentsSelectData.document_path]);

    if (documentError) {
      throw new SupabaseError(documentError, null, {
        globalTitle: 'Could not update taxi insurance',
      });
    }

    const { error: documentPathError, status: documentPathStatus } = await supabase
      .from('insurance')
      .update({ document_path: null })
      .eq('auth_id', session.user.id)
      .eq('id', id);

    if (documentPathError) {
      throw new SupabaseError(documentPathError, documentPathStatus, {
        globalTitle: 'Could not update taxi insurance',
      });
    }
  }
}

export function useUpdateTaxiInsuranceDetails() {
  const queryClient = useQueryClient();
  const { revalidate } = useRevalidator();
  const { toast } = useToast();

  const mutation = useMutation<void, SupabaseError, Variables>({
    mutationFn: updateTaxiInsuranceDetails,
    onSuccess: async (_data, { taxi_id, insurance }) => {
      if (insurance !== undefined) {
        queryClient.removeQueries({ queryKey: ['taxis', taxi_id, 'insurance', 'document'] });
      }

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
