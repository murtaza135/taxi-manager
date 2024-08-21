import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRevalidator } from 'react-router-dom';
import { supabase } from '@/config/api/supabaseClient';
import { queryClient as globalQueryClient } from '@/config/api/queryClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { SupabaseError } from '@/errors/classes/SupabaseError';
import { useToast } from '@/ui/toast';
import { Tables } from '@/types/database';
import { Prettify } from '@/types/utils';

export async function replaceDriverPicture(path: string) {
  const session = await globalQueryClient.ensureQueryData(sessionOptions());

  const { error, status } = await supabase
    .from('driver')
    .update(vars)
    .eq('auth_id', session.user.id)
    .eq('id', id)
    .select();

  if (error) {
    throw new SupabaseError(error, status, {
      globalTitle: 'Could not update driver',
    });
  }
}

export function useReplaceDriverPicture() {
  const queryClient = useQueryClient();
  const { revalidate } = useRevalidator();
  const { toast } = useToast();

  const mutation = useMutation<void, SupabaseError, string>({
    mutationFn: replaceDriverPicture,
    onSuccess: async (_data, path) => {
      await queryClient.invalidateQueries({ queryKey: ['storage', path] });
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
