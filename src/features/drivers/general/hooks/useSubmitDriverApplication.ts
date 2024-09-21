import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRevalidator } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import pick from 'lodash/pick';
import { supabase } from '@/config/api/supabaseClient';
import { SupabaseError } from '@/errors/classes/SupabaseError';
import { useToast } from '@/ui/toast';
import { Tables } from '@/types/database';
import { Prettify } from '@/types/utils';
import { extname } from '@/utils/path/extname';

export type Variables = Prettify<
  Omit<
    Tables<'driver_application'>,
    | 'company_name' | 'auth_id' | 'created_at' | 'is_submitted'
    | 'picture_path' | 'drivers_licence_path' | 'taxi_badge_path'
    | 'drivers_licence2_path' | 'taxi_badge2_path'
  > & {
    picture?: File | null | undefined;
    drivers_licence?: File | null | undefined;
    taxi_badge?: File | null | undefined;
    drivers_licence2?: File | null | undefined;
    taxi_badge2?: File | null | undefined;
  }
>;

type DocumentPathsObject = {
  picture_path?: string,
  drivers_licence_path?: string,
  taxi_badge_path?: string;
  drivers_licence2_path?: string,
  taxi_badge2_path?: string;
};

export async function submitDriverApplication({
  id,
  picture,
  drivers_licence,
  drivers_licence2,
  taxi_badge,
  taxi_badge2,
  ...vars
}: Variables) {
  const documentPaths: DocumentPathsObject = {};

  if (picture) {
    const { data: storageData } = await supabase
      .storage
      .from('main')
      .upload(
        `guest/driver-pictures/${uuidv4()}${extname(picture.name)}`,
        picture,
        { upsert: true },
      );

    if (storageData) {
      documentPaths.picture_path = storageData.path;
    }
  }

  if (drivers_licence) {
    const { data: storageData } = await supabase
      .storage
      .from('main')
      .upload(
        `guest/drivers-licences/${uuidv4()}${extname(drivers_licence.name)}`,
        drivers_licence,
        { upsert: true },
      );

    if (storageData) {
      documentPaths.drivers_licence_path = storageData.path;
    }
  }

  if (drivers_licence2) {
    const { data: storageData } = await supabase
      .storage
      .from('main')
      .upload(
        `guest/drivers-licences/${uuidv4()}${extname(drivers_licence2.name)}`,
        drivers_licence2,
        { upsert: true },
      );

    if (storageData) {
      documentPaths.drivers_licence2_path = storageData.path;
    }
  }

  if (taxi_badge) {
    const { data: storageData } = await supabase
      .storage
      .from('main')
      .upload(
        `guest/taxi-badges/${uuidv4()}${extname(taxi_badge.name)}`,
        taxi_badge,
        { upsert: true },
      );

    if (storageData) {
      documentPaths.taxi_badge_path = storageData.path;
    }
  }

  if (taxi_badge2) {
    const { data: storageData } = await supabase
      .storage
      .from('main')
      .upload(
        `guest/taxi-badges/${uuidv4()}${extname(taxi_badge2.name)}`,
        taxi_badge2,
        { upsert: true },
      );

    if (storageData) {
      documentPaths.taxi_badge2_path = storageData.path;
    }
  }

  const application_data = pick(vars, [
    'date_of_birth',
    'drivers_licence_end_date',
    'drivers_licence_number',
    'drivers_licence_start_date',
    'email',
    'name',
    'national_insurance_number',
    'phone_number',
    'taxi_badge_end_date',
    'taxi_badge_number',
    'taxi_badge_start_date',
  ]);

  const { error, status } = await supabase
    .from('driver_application')
    .update({ ...application_data, ...documentPaths, is_submitted: true })
    .eq('id', id);

  if (error) {
    throw new SupabaseError(error, status, {
      globalTitle: 'Could not submit application',
    });
  }

  return id;
}

export function useSubmitDriverApplication() {
  const queryClient = useQueryClient();
  const { revalidate } = useRevalidator();
  const { toast } = useToast();

  const mutation = useMutation<string, SupabaseError, Variables>({
    mutationFn: submitDriverApplication,
    onSuccess: async (_data, { id, picture, drivers_licence, taxi_badge }) => {
      if (picture !== undefined) {
        queryClient.removeQueries({ queryKey: ['driverApplications', id, 'picture'] });
      }

      if (drivers_licence !== undefined) {
        queryClient.removeQueries({ queryKey: ['driverApplications', id, 'licence'] });
      }

      if (taxi_badge !== undefined) {
        queryClient.removeQueries({ queryKey: ['driverApplications', id, 'badge'] });
      }

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['driverApplications', 'list'] }),
        queryClient.invalidateQueries({ queryKey: ['driverApplications', id], exact: true }),
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
