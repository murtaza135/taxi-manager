import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useRevalidator } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/ui/toast';
import { AddNewDriverTaxiBadgeSchema } from '@/features/drivers/addNewDriver/schemas';
import { SupabaseError } from '@/errors/classes/SupabaseError';
import { queryClient as globalQueryClient } from '@/config/api/queryClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { supabase } from '@/config/api/supabaseClient';
import { extname } from '@/utils/path/extname';
import { CreateObjectTransformer } from '@/utils/transformer';

type DriverDocumentPathsObject = {
  badge_document?: string;
  badge_document2?: string;
};

type Variables = CreateObjectTransformer<AddNewDriverTaxiBadgeSchema> & {
  driver_id: number;
};

export async function attachTaxiBadgeToDriver(variables: Variables) {
  const session = await globalQueryClient.ensureQueryData(sessionOptions());

  const documentPaths: DriverDocumentPathsObject = {};
  const {
    badge_document,
    badge_document2,
    driver_id,
    ...nonFileFormData
  } = variables;

  // TODO add storage rollback on error
  if (badge_document) {
    const fileName = `${session.user.id}/taxi-badges/${uuidv4()}${extname(badge_document.name)}`;

    const { data: storageData } = await supabase
      .storage
      .from('main')
      .upload(fileName, badge_document, { upsert: true });

    if (storageData) {
      documentPaths.badge_document = storageData.path;
    }
  }

  if (badge_document2) {
    const fileName = `${session.user.id}/taxi-badges/${uuidv4()}${extname(badge_document2.name)}`;

    const { data: storageData } = await supabase
      .storage
      .from('main')
      .upload(fileName, badge_document2, { upsert: true });

    if (storageData) {
      documentPaths.badge_document2 = storageData.path;
    }
  }

  const { data: badgeData, error: badgeError, status: badgeStatus } = await supabase
    .from('drivers_taxi_badge')
    .insert({
      driver_id,
      badge_number: nonFileFormData.badge_number,
      start_date: nonFileFormData.badge_start_date,
      end_date: nonFileFormData.badge_end_date,
      document_path: documentPaths.badge_document,
      document_path2: documentPaths.badge_document2,
    })
    .eq('auth_id', session.user.id)
    .select('id')
    .limit(1)
    .single();

  if (badgeError) {
    throw new SupabaseError(badgeError, badgeStatus);
  }

  const { error: driverLinkError, status: driverLinkStatus } = await supabase
    .from('driver')
    .update({ active_drivers_taxi_badge_id: badgeData.id })
    .eq('auth_id', session.user.id)
    .eq('id', driver_id);

  if (driverLinkError) {
    throw new SupabaseError(driverLinkError, driverLinkStatus);
  }

  return driver_id;
}

export function useAttachTaxiBadgeToDriver() {
  const queryClient = useQueryClient();
  const { revalidate } = useRevalidator();
  const { toast } = useToast();

  const mutation = useMutation<number, SupabaseError, Variables>({
    mutationFn: attachTaxiBadgeToDriver,
    onSuccess: async (_data, { driver_id }) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['drivers', 'list'] }),
        queryClient.invalidateQueries({ queryKey: ['drivers', driver_id, 'taxiBadge'], exact: true }),
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
