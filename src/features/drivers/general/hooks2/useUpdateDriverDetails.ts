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
      Tables<'driver'>,
      | 'name' | 'phone_number' | 'email' | 'date_of_birth'
      | 'national_insurance_number' | 'is_retired'
    >
  > & {
    id: number;
    picture?: File | null | undefined;
  }
>;

export async function updateDriverDetails({ id, picture, ...vars }: Variables) {
  const session = await globalQueryClient.ensureQueryData(sessionOptions());

  if (!isEmpty(vars)) {
    const { error, status } = await supabase
      .from('driver')
      .update(vars)
      .eq('auth_id', session.user.id)
      .eq('id', id);

    if (error) {
      throw new SupabaseError(error, status, {
        globalTitle: 'Could not update driver',
      });
    }
  }

  const {
    data: pictureSelectData,
    error: pictureSelectError,
    status: pictureSelectStatus,
  } = await supabase
    .from('driver')
    .select('picture_path')
    .eq('auth_id', session.user.id)
    .eq('id', id)
    .limit(1)
    .single();

  if (pictureSelectError) {
    throw new SupabaseError(pictureSelectError, pictureSelectStatus, {
      globalTitle: 'Could not update driver',
    });
  }

  if (picture && !pictureSelectData.picture_path) {
    /* add picture */
    const picture_path = `${session.user.id}/driver-pictures/${uuidv4()}`;
    const compressedPicture = await compressImage(
      picture,
      { maxWidth: 150, maxHeight: 150 },
    );

    const { error: pictureError } = await supabase
      .storage
      .from('main')
      .upload(picture_path, compressedPicture, { upsert: true });

    if (pictureError) {
      throw new SupabaseError(pictureError, null, {
        globalTitle: 'Could not update driver',
      });
    }

    const { error: picturePathError, status: picturePathStatus } = await supabase
      .from('driver')
      .update({ picture_path })
      .eq('auth_id', session.user.id)
      .eq('id', id);

    if (picturePathError) {
      throw new SupabaseError(picturePathError, picturePathStatus, {
        globalTitle: 'Could not update driver',
      });
    }
  } else if (picture && pictureSelectData.picture_path) {
    /* replace picture */
    const compressedPicture = await compressImage(
      picture,
      { maxWidth: 150, maxHeight: 150 },
    );

    const { error: pictureError } = await supabase
      .storage
      .from('main')
      .update(pictureSelectData.picture_path, compressedPicture, { upsert: true });

    if (pictureError) {
      throw new SupabaseError(pictureError, null, {
        globalTitle: 'Could not update driver',
      });
    }
  } else if (picture === null && pictureSelectData.picture_path) {
    /* delete picture */
    const { error: pictureError } = await supabase
      .storage
      .from('main')
      .remove([pictureSelectData.picture_path]);

    if (pictureError) {
      throw new SupabaseError(pictureError, null, {
        globalTitle: 'Could not update driver',
      });
    }

    const { error: picturePathError, status: picturePathStatus } = await supabase
      .from('driver')
      .update({ picture_path: null })
      .eq('auth_id', session.user.id)
      .eq('id', id);

    if (picturePathError) {
      throw new SupabaseError(picturePathError, picturePathStatus, {
        globalTitle: 'Could not update driver',
      });
    }
  }
}

export function useUpdateDriverDetails() {
  const queryClient = useQueryClient();
  const { revalidate } = useRevalidator();
  const { toast } = useToast();

  const mutation = useMutation<void, SupabaseError, Variables>({
    mutationFn: updateDriverDetails,
    onSuccess: async (_data, { id, picture }) => {
      if (picture !== undefined) {
        queryClient.removeQueries({ queryKey: ['drivers', id, 'details', 'picture'] });
      }
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['drivers', 'list'], exact: true }),
        queryClient.invalidateQueries({ queryKey: ['drivers', id, 'details'], exact: true }),
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
