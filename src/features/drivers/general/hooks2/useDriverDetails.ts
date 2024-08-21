import { useSuspenseQuery, queryOptions } from '@tanstack/react-query';
import mapValues from 'lodash/mapValues';
import { supabase } from '@/config/api/supabaseClient';
import { SupabaseError } from '@/errors/classes/SupabaseError';
import { Tables } from '@/types/database';
import { queryClient } from '@/config/api/queryClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { Prettify, NonNullableObject } from '@/types/utils';
import { driverPictureQueryOptions } from '@/features/drivers/general/hooks2/useDriverPicture';

type SupabaseDriverDetails = Prettify<
  Partial<NonNullableObject<
    Pick<
      Tables<'driver_view'>,
      | 'email' | 'phone_number' | 'date_of_birth'
      | 'national_insurance_number'
      | 'picture_path' | 'created_at'
    >
  >> & {
    name: string;
    is_retired: boolean;
  }
>;

type DriverDetails = Prettify<
  SupabaseDriverDetails & {
    id: number;
    picture_src?: string;
  }
>;

async function getDriverDetails(id: number): Promise<DriverDetails> {
  const session = await queryClient.ensureQueryData(sessionOptions());

  const { data, error, status } = await supabase
    .from('driver_view')
    .select('email, phone_number, national_insurance_number, date_of_birth, picture_path, name, is_retired, created_at')
    .eq('id', id)
    .eq('auth_id', session.user.id)
    .returns<SupabaseDriverDetails[]>()
    .limit(1)
    .single();

  if (error) {
    throw new SupabaseError(error, status, {
      globalTitle: 'Could not fetch driver',
      titles: { notFound: `Driver ${id} does not exist` },
    });
  }

  const picture_src = await queryClient.ensureQueryData(
    driverPictureQueryOptions({ id, path: data.picture_path }),
  );

  const mappedData = mapValues(data, (val) => val ?? undefined) as SupabaseDriverDetails;
  return { ...mappedData, picture_src, id };
}

export function driverDetailsQueryOptions(id: number) {
  return queryOptions<DriverDetails, SupabaseError>({
    queryKey: ['drivers', id, 'details'],
    queryFn: () => getDriverDetails(id),
  });
}

export function useDriverDetails(id: number) {
  const query = useSuspenseQuery(driverDetailsQueryOptions(id));
  return query;
}
