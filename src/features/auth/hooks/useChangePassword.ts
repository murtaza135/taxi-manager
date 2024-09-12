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
import { ChangePasswordSchema } from '@/features/settings/schemas';

export async function changePassword(data: ChangePasswordSchema) {
  const session = await globalQueryClient.ensureQueryData(sessionOptions());

  // const { error, status } = await supabase
  //   .from('company')
  //   .update(vars)
  //   .eq('auth_id', session.user.id);

  // if (error) {
  //   throw new SupabaseError(error, status, {
  //     globalTitle: 'Could not update company',
  //   });
  // }
}

export function useChangePassword() {
  const queryClient = useQueryClient();
  const { revalidate } = useRevalidator();
  const { toast } = useToast();

  const mutation = useMutation<void, SupabaseError, ChangePasswordSchema>({
    mutationFn: changePassword,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['auth', 'session'] }),
        queryClient.invalidateQueries({ queryKey: ['auth', 'user'] }),
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
