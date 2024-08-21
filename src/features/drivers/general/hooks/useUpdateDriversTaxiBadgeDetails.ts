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
import { compressImage } from '@/utils/compression/compressImage';

// TODO make simpler

export type Variables = Prettify<
  Partial<
    Pick<
      Tables<'drivers_taxi_badge'>,
      'badge_number' | 'start_date' | 'end_date'
    >
  > & {
    id: number;
    driver_id: number;
    document?: File | null | undefined;
  }
>;

export async function updateDriversTaxiBadgeDetails({
  id,
  document,
  driver_id,
  ...vars
}: Variables) {
  const session = await globalQueryClient.ensureQueryData(sessionOptions());

  if (!isEmpty(vars)) {
    const { error, status } = await supabase
      .from('drivers_taxi_badge')
      .update(vars)
      .eq('auth_id', session.user.id)
      .eq('id', id);

    if (error) {
      throw new SupabaseError(error, status, {
        globalTitle: 'Could not update drivers taxi badge',
      });
    }
  }

  const {
    data: documentSelectData,
    error: documentSelectError,
    status: documentSelectStatus,
  } = await supabase
    .from('drivers_taxi_badge')
    .select('document_path')
    .eq('auth_id', session.user.id)
    .eq('id', id)
    .limit(1)
    .single();

  if (documentSelectError) {
    throw new SupabaseError(documentSelectError, documentSelectStatus, {
      globalTitle: 'Could not update drivers taxi badge',
    });
  }

  if (document && !documentSelectData.document_path) {
    /* add document */
    const document_path = `${session.user.id}/taxi-badges/${uuidv4()}`;
    const compressedDocument = await compressImage(
      document,
      { maxWidth: 150, maxHeight: 150 },
    );

    const { error: documentError } = await supabase
      .storage
      .from('main')
      .upload(document_path, compressedDocument, { upsert: true });

    if (documentError) {
      throw new SupabaseError(documentError, null, {
        globalTitle: 'Could not update drivers taxi badge',
      });
    }

    const { error: documentPathError, status: documentPathStatus } = await supabase
      .from('drivers_taxi_badge')
      .update({ document_path })
      .eq('auth_id', session.user.id)
      .eq('id', id);

    if (documentPathError) {
      throw new SupabaseError(documentPathError, documentPathStatus, {
        globalTitle: 'Could not update drivers taxi badge',
      });
    }
  } else if (document && documentSelectData.document_path) {
    /* replace document */
    const compressedDocument = await compressImage(
      document,
      { maxWidth: 150, maxHeight: 150 },
    );

    const { error: documentError } = await supabase
      .storage
      .from('main')
      .update(documentSelectData.document_path, compressedDocument, { upsert: true });

    if (documentError) {
      throw new SupabaseError(documentError, null, {
        globalTitle: 'Could not update drivers taxi badge',
      });
    }
  } else if (document === null && documentSelectData.document_path) {
    /* delete document */
    const { error: documentError } = await supabase
      .storage
      .from('main')
      .remove([documentSelectData.document_path]);

    if (documentError) {
      throw new SupabaseError(documentError, null, {
        globalTitle: 'Could not update drivers taxi badge',
      });
    }

    const { error: documentPathError, status: documentPathStatus } = await supabase
      .from('drivers_taxi_badge')
      .update({ document_path: null })
      .eq('auth_id', session.user.id)
      .eq('id', id);

    if (documentPathError) {
      throw new SupabaseError(documentPathError, documentPathStatus, {
        globalTitle: 'Could not update drivers taxi badge',
      });
    }
  }
}

export function useUpdateDriversTaxiBadgeDetails() {
  const queryClient = useQueryClient();
  const { revalidate } = useRevalidator();
  const { toast } = useToast();

  const mutation = useMutation<void, SupabaseError, Variables>({
    mutationFn: updateDriversTaxiBadgeDetails,
    onSuccess: async (_data, { driver_id, document }) => {
      if (document !== undefined) {
        queryClient.removeQueries({ queryKey: ['drivers', driver_id, 'taxiBadge', 'document'] });
      }
      await queryClient.invalidateQueries({ queryKey: ['drivers', driver_id, 'taxiBadge'], exact: true });
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
