import { keepPreviousData, infiniteQueryOptions, QueryKey, useSuspenseInfiniteQuery, InfiniteData, QueryFunctionContext } from '@tanstack/react-query';
import { Prettify, NonNullableObject } from '@/types/utils';
import { Tables } from '@/types/database';
import { queryClient } from '@/config/api/queryClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { supabase } from '@/config/api/supabaseClient';
import { capitalizeEachWord } from '@/utils/string/capitalizeEachWord';
import { SupabaseError } from '@/errors/classes/SupabaseError';
import { taxiPictureQueryOptions } from '@/features/taxis/general/hooks/useTaxiDetails';

const fetchSize = 50;

type SupabaseTaxi = Prettify<
  Partial<NonNullableObject<
    Pick<
      Tables<'taxi_view'>,
      | 'picture_path' | 'driver_id' | 'hire_agreement_id' | 'phc_number' | 'driver_name'
    >
  >> & NonNullableObject<
    Pick<
      Tables<'taxi_view'>,
      | 'id' | 'number_plate' | 'colour' | 'is_retired' | 'make' | 'model'
    >
  >
>;

export type Taxi = Prettify<
  SupabaseTaxi & {
    picture_src: string | null;
  }
>;

type TaxiResult = {
  data: Taxi[];
  count: number;
};

type Variables = {
  search?: string;
  isRetired?: boolean;
};

type Context = QueryFunctionContext<QueryKey, number>;

async function getTaxis(
  { search = '', isRetired = false }: Variables,
  { pageParam }: Context,
): Promise<TaxiResult> {
  const session = await queryClient.ensureQueryData(sessionOptions());

  const from = fetchSize * pageParam;
  const to = from + fetchSize - 1;

  const { data, error, status, count } = await supabase
    .from('taxi_view')
    .select(
      'id, number_plate, colour, is_retired, make, model, picture_path, driver_id, driver_name, hire_agreement_id, phc_number',
      { count: 'estimated' },
    )
    .eq('auth_id', session.user.id)
    .eq('is_retired', isRetired)
    .order('created_at', { ascending: false })
    .or(`number_plate.ilike.%${search}%, make.ilike.%${search}%, model.ilike.%${search}%,  phc_number.ilike.%${search}%`)
    .range(from, to)
    .returns<SupabaseTaxi[]>();

  if (status === 404) return { data: [], count: 0 };

  if (error) {
    throw new SupabaseError(error, status, {
      globalTitle: 'Could not fetch taxis',
    });
  }

  const taxis = await Promise.all(
    data.map(async (taxi) => {
      const number_plate = taxi.number_plate.toUpperCase();
      const colour = capitalizeEachWord(taxi.colour);
      const make = capitalizeEachWord(taxi.make);
      const model = capitalizeEachWord(taxi.model);
      const phc_number = taxi.phc_number?.toUpperCase();
      const driver_name = taxi.driver_name ? capitalizeEachWord(taxi.driver_name) : undefined;
      const picture_src = await queryClient.ensureQueryData(
        taxiPictureQueryOptions({ id: taxi.id, path: taxi.picture_path }),
      );
      return { ...taxi, number_plate, colour, make, model, driver_name, phc_number, picture_src };
    }),
  );

  return {
    data: taxis,
    count: count ?? 0,
  };
}

export function taxisQueryOptions(options?: Variables) {
  const search = options?.search;
  const isRetired = options?.isRetired;

  return infiniteQueryOptions<
    TaxiResult,
    SupabaseError,
    InfiniteData<TaxiResult, number>,
    QueryKey,
    number
  >({
    queryKey: ['taxis', 'list', { search, isRetired }],
    queryFn: (context) => getTaxis({ search, isRetired }, context),
    initialPageParam: 0,
    getNextPageParam: (_lastGroup, groups) => groups.length,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
}

export function useTaxis(options?: Variables) {
  const query = useSuspenseInfiniteQuery(taxisQueryOptions(options));
  return query;
}
