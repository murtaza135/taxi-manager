import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRevalidator } from 'react-router-dom';
import { supabase } from '@/config/api/supabaseClient';
import { SupabaseError } from '@/errors/classes/SupabaseError';
import { useToast } from '@/ui/toast';
import { compressImage, Options as CompressImageOptions } from '@/utils/compression/compressImage';

type ReplaceFileInStorageVariables = {
  path: string;
  file: File;
  options?: CompressImageOptions;
};

export async function replaceFileInStorage({
  path,
  file,
  options = { maxWidth: 150, maxHeight: 150 },
}: ReplaceFileInStorageVariables) {
  const compressedFile = await compressImage(file, options);

  const { error } = await supabase
    .storage
    .from('main')
    .update(path, compressedFile, { upsert: true });

  if (error) {
    throw new SupabaseError(error);
  }
}

export function useReplaceSupabaseStorage() {
  const queryClient = useQueryClient();
  const { revalidate } = useRevalidator();
  const { toast } = useToast();

  const mutation = useMutation<void, SupabaseError, ReplaceFileInStorageVariables>({
    mutationFn: replaceFileInStorage,
    onSuccess: async (_data, { path }) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['storage', path] }),
        // queryClient.invalidateQueries({ queryKey: ['drivers', 'list'] }),
        // queryClient.invalidateQueries({ queryKey: ['drivers'] }),
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
