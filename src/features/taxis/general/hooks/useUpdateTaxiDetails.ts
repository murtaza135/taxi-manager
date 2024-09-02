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
      Tables<'taxi'>,
      | 'number_plate' | 'colour' | 'chassis_number' | 'registration_date'
      | 'expected_expiry_date' | 'road_tax_expiry_date' | 'is_retired'
      | 'make' | 'model' | 'cc' | 'fuel_type'
    >
  > & {
    id: number;
    picture?: File | null | undefined;
    logbook?: File | null | undefined;
  }
>;

export async function updateTaxiDetails({ id, picture, logbook, ...vars }: Variables) {
  const session = await globalQueryClient.ensureQueryData(sessionOptions());

  if (!isEmpty(vars)) {
    const { error, status } = await supabase
      .from('taxi')
      .update(vars)
      .eq('auth_id', session.user.id)
      .eq('id', id);

    if (error) {
      throw new SupabaseError(error, status, {
        globalTitle: 'Could not update taxi',
      });
    }
  }

  const {
    data: documentsSelectData,
    error: documentsSelectError,
    status: documentsSelectStatus,
  } = await supabase
    .from('taxi')
    .select('picture_path, logbook_document_path')
    .eq('auth_id', session.user.id)
    .eq('id', id)
    .limit(1)
    .single();

  if (documentsSelectError) {
    throw new SupabaseError(documentsSelectError, documentsSelectStatus, {
      globalTitle: 'Could not update taxi',
    });
  }

  if (picture && !documentsSelectData.picture_path) {
    /* add picture */
    const picture_path = `${session.user.id}/taxi-pictures/${uuidv4()}${extname(picture.name)}`;

    const { error: pictureError } = await supabase
      .storage
      .from('main')
      .upload(picture_path, picture, { upsert: true });

    if (pictureError) {
      throw new SupabaseError(pictureError, null, {
        globalTitle: 'Could not update taxi',
      });
    }

    const { error: picturePathError, status: picturePathStatus } = await supabase
      .from('taxi')
      .update({ picture_path })
      .eq('auth_id', session.user.id)
      .eq('id', id);

    if (picturePathError) {
      throw new SupabaseError(picturePathError, picturePathStatus, {
        globalTitle: 'Could not update taxi',
      });
    }
  } else if (picture && documentsSelectData.picture_path) {
    /* replace picture */
    const { error: pictureError } = await supabase
      .storage
      .from('main')
      .update(documentsSelectData.picture_path, picture, { upsert: true });

    if (pictureError) {
      throw new SupabaseError(pictureError, null, {
        globalTitle: 'Could not update taxi',
      });
    }
  } else if (picture === null && documentsSelectData.picture_path) {
    /* delete picture */
    const { error: pictureError } = await supabase
      .storage
      .from('main')
      .remove([documentsSelectData.picture_path]);

    if (pictureError) {
      throw new SupabaseError(pictureError, null, {
        globalTitle: 'Could not update taxi',
      });
    }

    const { error: picturePathError, status: picturePathStatus } = await supabase
      .from('taxi')
      .update({ picture_path: null })
      .eq('auth_id', session.user.id)
      .eq('id', id);

    if (picturePathError) {
      throw new SupabaseError(picturePathError, picturePathStatus, {
        globalTitle: 'Could not update taxi',
      });
    }
  }

  if (logbook && !documentsSelectData.logbook_document_path) {
    /* add logbook */
    const logbook_document_path = `${session.user.id}/taxi-pictures/${uuidv4()}${extname(logbook.name)}`;

    const { error: logbookError } = await supabase
      .storage
      .from('main')
      .upload(logbook_document_path, logbook, { upsert: true });

    if (logbookError) {
      throw new SupabaseError(logbookError, null, {
        globalTitle: 'Could not update taxi',
      });
    }

    const { error: logbookPathError, status: logbookPathStatus } = await supabase
      .from('taxi')
      .update({ logbook_document_path })
      .eq('auth_id', session.user.id)
      .eq('id', id);

    if (logbookPathError) {
      throw new SupabaseError(logbookPathError, logbookPathStatus, {
        globalTitle: 'Could not update taxi',
      });
    }
  } else if (logbook && documentsSelectData.logbook_document_path) {
    /* replace logbook */
    const { error: logbookError } = await supabase
      .storage
      .from('main')
      .update(documentsSelectData.logbook_document_path, logbook, { upsert: true });

    if (logbookError) {
      throw new SupabaseError(logbookError, null, {
        globalTitle: 'Could not update taxi',
      });
    }
  } else if (logbook === null && documentsSelectData.logbook_document_path) {
    /* delete logbook */
    const { error: logbookError } = await supabase
      .storage
      .from('main')
      .remove([documentsSelectData.logbook_document_path]);

    if (logbookError) {
      throw new SupabaseError(logbookError, null, {
        globalTitle: 'Could not update taxi',
      });
    }

    const { error: logbookPathError, status: logbookPathStatus } = await supabase
      .from('taxi')
      .update({ logbook_document_path: null })
      .eq('auth_id', session.user.id)
      .eq('id', id);

    if (logbookPathError) {
      throw new SupabaseError(logbookPathError, logbookPathStatus, {
        globalTitle: 'Could not update taxi',
      });
    }
  }
}

export function useUpdateTaxiDetails() {
  const queryClient = useQueryClient();
  const { revalidate } = useRevalidator();
  const { toast } = useToast();

  const mutation = useMutation<void, SupabaseError, Variables>({
    mutationFn: updateTaxiDetails,
    onSuccess: async (_data, { id, picture, logbook }) => {
      if (picture !== undefined) {
        queryClient.removeQueries({ queryKey: ['taxis', id, 'details', 'picture'] });
      }

      if (logbook !== undefined) {
        queryClient.removeQueries({ queryKey: ['taxis', id, 'details', 'logbook'] });
      }

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['taxis', 'list'] }),
        queryClient.invalidateQueries({ queryKey: ['taxis', id, 'details'], exact: true }),
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
