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

export type Variables = Prettify<
  Partial<
    Pick<
      Tables<'company'>,
      'name' | 'company_number' | 'address' | 'phone_number'
    >
  > & {
    logo?: File | null | undefined;
  }
>;

export async function updateCompany({ logo, ...vars }: Variables) {
  const session = await globalQueryClient.ensureQueryData(sessionOptions());

  if (!isEmpty(vars)) {
    const { error, status } = await supabase
      .from('company')
      .update(vars)
      .eq('auth_id', session.user.id);

    if (error) {
      throw new SupabaseError(error, status, {
        globalTitle: 'Could not update company',
      });
    }
  }

  const {
    data: logoSelectData,
    error: logoSelectError,
    status: logoSelectStatus,
  } = await supabase
    .from('company')
    .select('logo_path')
    .eq('auth_id', session.user.id)
    .limit(1)
    .single();

  if (logoSelectError) {
    throw new SupabaseError(logoSelectError, logoSelectStatus, {
      globalTitle: 'Could not update company',
    });
  }

  if (logo) {
    /* add logo */
    const logo_path = `${session.user.id}/logos/${uuidv4()}${extname(logo.name)}`;

    const { error: logoError } = await supabase
      .storage
      .from('main')
      .upload(logo_path, logo, { upsert: true });

    if (logoError) {
      throw new SupabaseError(logoError, null, {
        globalTitle: 'Could not update company',
      });
    }

    const { error: logoPathError, status: logoPathStatus } = await supabase
      .from('company')
      .update({ logo_path })
      .eq('auth_id', session.user.id);

    if (logoPathError) {
      throw new SupabaseError(logoPathError, logoPathStatus, {
        globalTitle: 'Could not update company',
      });
    }

    // delete old file if it exists
    if (logoSelectData.logo_path) {
      await supabase
        .storage
        .from('main')
        .remove([logoSelectData.logo_path]);
    }
  } else if (logo === null && logoSelectData.logo_path) {
    /* delete logo */
    const { error: logoError } = await supabase
      .storage
      .from('main')
      .remove([logoSelectData.logo_path]);

    if (logoError) {
      throw new SupabaseError(logoError, null, {
        globalTitle: 'Could not update company',
      });
    }

    const { error: logoPathError, status: logoPathStatus } = await supabase
      .from('company')
      .update({ logo_path: null })
      .eq('auth_id', session.user.id);

    if (logoPathError) {
      throw new SupabaseError(logoPathError, logoPathStatus, {
        globalTitle: 'Could not update company',
      });
    }
  }
}

export function useUpdateCompany() {
  const queryClient = useQueryClient();
  const { revalidate } = useRevalidator();
  const { toast } = useToast();

  const mutation = useMutation<void, SupabaseError, Variables>({
    mutationFn: updateCompany,
    onSuccess: async (_data, { logo }) => {
      if (logo !== undefined) {
        queryClient.removeQueries({ queryKey: ['auth', 'company', 'logo'] });
      }
      await queryClient.invalidateQueries({ queryKey: ['auth', 'company'], exact: true });
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
