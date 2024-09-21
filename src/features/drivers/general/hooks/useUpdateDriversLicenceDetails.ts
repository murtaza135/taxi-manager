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
      Tables<'drivers_licence'>,
      'licence_number' | 'start_date' | 'end_date'
    >
  > & {
    id: number;
    driver_id: number;
    document?: File | null | undefined;
    document2?: File | null | undefined;
  }
>;

export async function updateDriversLicenceDetails({ id, document, document2, ...vars }: Variables) {
  const session = await globalQueryClient.ensureQueryData(sessionOptions());

  if (!isEmpty(vars)) {
    const { error, status } = await supabase
      .from('drivers_licence')
      .update(vars)
      .eq('auth_id', session.user.id)
      .eq('id', id);

    if (error) {
      throw new SupabaseError(error, status, {
        globalTitle: 'Could not update drivers licence',
      });
    }
  }

  const {
    data: documentSelectData,
    error: documentSelectError,
    status: documentSelectStatus,
  } = await supabase
    .from('drivers_licence')
    .select('document_path, document2_path')
    .eq('auth_id', session.user.id)
    .eq('id', id)
    .limit(1)
    .single();

  if (documentSelectError) {
    throw new SupabaseError(documentSelectError, documentSelectStatus, {
      globalTitle: 'Could not update drivers licence',
    });
  }

  if (document) {
    /* add document */
    const document_path = `${session.user.id}/drivers-licences/${uuidv4()}${extname(document.name)}`;

    const { error: documentError } = await supabase
      .storage
      .from('main')
      .upload(document_path, document, { upsert: true });

    if (documentError) {
      throw new SupabaseError(documentError, null, {
        globalTitle: 'Could not update drivers licence',
      });
    }

    const { error: documentPathError, status: documentPathStatus } = await supabase
      .from('drivers_licence')
      .update({ document_path })
      .eq('auth_id', session.user.id)
      .eq('id', id);

    if (documentPathError) {
      throw new SupabaseError(documentPathError, documentPathStatus, {
        globalTitle: 'Could not update drivers licence',
      });
    }

    // delete old file if it exists
    if (documentSelectData.document_path) {
      await supabase
        .storage
        .from('main')
        .remove([documentSelectData.document_path]);
    }
  } else if (document === null && documentSelectData.document_path) {
    /* delete document */
    const { error: documentError } = await supabase
      .storage
      .from('main')
      .remove([documentSelectData.document_path]);

    if (documentError) {
      throw new SupabaseError(documentError, null, {
        globalTitle: 'Could not update drivers licence',
      });
    }

    const { error: documentPathError, status: documentPathStatus } = await supabase
      .from('drivers_licence')
      .update({ document_path: null })
      .eq('auth_id', session.user.id)
      .eq('id', id);

    if (documentPathError) {
      throw new SupabaseError(documentPathError, documentPathStatus, {
        globalTitle: 'Could not update drivers licence',
      });
    }
  }

  if (document2) {
    /* add document2 */
    const document2_path = `${session.user.id}/drivers-licences/${uuidv4()}${extname(document2.name)}`;

    const { error: document2Error } = await supabase
      .storage
      .from('main')
      .upload(document2_path, document2, { upsert: true });

    if (document2Error) {
      throw new SupabaseError(document2Error, null, {
        globalTitle: 'Could not update drivers licence',
      });
    }

    const { error: document2PathError, status: document2PathStatus } = await supabase
      .from('drivers_licence')
      .update({ document2_path })
      .eq('auth_id', session.user.id)
      .eq('id', id);

    if (document2PathError) {
      throw new SupabaseError(document2PathError, document2PathStatus, {
        globalTitle: 'Could not update drivers licence',
      });
    }

    // delete old file if it exists
    if (documentSelectData.document2_path) {
      await supabase
        .storage
        .from('main')
        .remove([documentSelectData.document2_path]);
    }
  } else if (document2 === null && documentSelectData.document2_path) {
    /* delete document2 */
    const { error: document2Error } = await supabase
      .storage
      .from('main')
      .remove([documentSelectData.document2_path]);

    if (document2Error) {
      throw new SupabaseError(document2Error, null, {
        globalTitle: 'Could not update drivers licence',
      });
    }

    const { error: document2PathError, status: document2PathStatus } = await supabase
      .from('drivers_licence')
      .update({ document2_path: null })
      .eq('auth_id', session.user.id)
      .eq('id', id);

    if (document2PathError) {
      throw new SupabaseError(document2PathError, document2PathStatus, {
        globalTitle: 'Could not update drivers licence',
      });
    }
  }
}

export function useUpdateDriversLicenceDetails() {
  const queryClient = useQueryClient();
  const { revalidate } = useRevalidator();
  const { toast } = useToast();

  const mutation = useMutation<void, SupabaseError, Variables>({
    mutationFn: updateDriversLicenceDetails,
    onSuccess: async (_data, { driver_id, document }) => {
      if (document !== undefined) {
        queryClient.removeQueries({ queryKey: ['drivers', driver_id, 'licence', 'document'] });
      }
      await queryClient.invalidateQueries({ queryKey: ['drivers', driver_id, 'licence'], exact: true });
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
