/* eslint-disable @typescript-eslint/naming-convention */
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { Prettify } from '@/types/utils';
import { Tables } from '@/types/database';
import { queryClient } from '@/config/api/queryClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { supabase } from '@/config/api/supabaseClient';
import { buildAppErrorFromSupabaseError } from '@/errors/supabaseErrorUtils';
import { AppError } from '@/errors/AppError';
import { capitalizeEachWord } from '@/utils/string/capitalizeEachWord';

// TODO separate driver details query and driver picture srcs query to allow for different levels of caching via staleTime

export type DriverDetails = Prettify<
  Pick<
    Tables<'driver'>,
    'id' | 'phone_number' | 'email' | 'active_hire_agreement_id'
  > & {
    name: string;
    picture_src: string | null;
  } & {
    active_taxi_id: Tables<'taxi'>['id'] | null;
    active_taxi_number_plate: Tables<'taxi'>['number_plate'] | null;
  }
>;

async function getAllDriverDetails(): Promise<DriverDetails[]> {
  const session = await queryClient.ensureQueryData(sessionOptions());

  const { data, error, status } = await supabase
    .from('driver')
    .select(`
      id,
      first_names,
      last_name,
      phone_number,
      email,
      picture_path,
      active_hire_agreement_id,
      hire_agreement!driver_active_hire_agreement_id_fkey(
        taxi_id,
        taxi!hire_agreement_taxi_id_fkey(
          number_plate
        )
      )
    `)
    .eq('auth_id', session.user.id);

  if (status === 404) return [];

  if (error) {
    throw buildAppErrorFromSupabaseError(error, status)
      .setTitle('Could not fetch drivers')
      .setDescription('Something went wrong')
      .setDescription('notFound', 'You currently have no drivers')
      .setDescription('offline', 'You are offline! Please reconnect to continue using the app.')
      .setDescription('tooManyRequests', 'Something went wrong. Please try again later.')
      .build();
  }

  const picturePaths = data.map(({ picture_path }) => picture_path ?? '');

  const { data: urls } = await supabase
    .storage
    .from('main')
    .createSignedUrls(picturePaths, 60, { download: true });

  const srcs = urls?.map(({ signedUrl }) => signedUrl as string | null) ?? null;

  const drivers = data.map((driver, index) => {
    const { hire_agreement, picture_path, first_names, last_name, ...rest } = driver;
    const name = capitalizeEachWord(`${first_names} ${last_name}`);
    const picture_src = srcs?.[index] ?? null;
    const active_taxi_id = hire_agreement?.taxi_id ?? null;
    const active_taxi_number_plate = hire_agreement?.taxi?.number_plate.toUpperCase() ?? null;
    return { ...rest, name, picture_src, active_taxi_id, active_taxi_number_plate };
  });

  return drivers;
}

export function driversOptions() {
  return queryOptions<DriverDetails[], AppError>({
    queryKey: ['drivers'],
    queryFn: getAllDriverDetails,
    staleTime: 1000 * 60, // 60 seconds
  });
}

export function useDrivers() {
  const query = useSuspenseQuery(driversOptions());
  return query;
}
