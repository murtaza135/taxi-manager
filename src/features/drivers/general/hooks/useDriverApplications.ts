import { keepPreviousData, infiniteQueryOptions, QueryKey, useSuspenseInfiniteQuery, InfiniteData, QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query';
import { Prettify, ReplaceNullWithUndefined } from '@/types/utils';
import { Tables } from '@/types/database';
import { queryClient } from '@/config/api/queryClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { supabase } from '@/config/api/supabaseClient';
import { capitalizeEachWord } from '@/utils/string/capitalizeEachWord';
import { SupabaseError } from '@/errors/classes/SupabaseError';
import { driverApplicationPictureQueryOptions } from '@/features/drivers/general/hooks/useDriverApplication';
import { DriverApplicationsRowFilterState } from '@/features/drivers/general/types';

const fetchSize = 50;

type SupabaseDriverApplication = ReplaceNullWithUndefined<
  Pick<
    Tables<'driver_application'>,
    | 'name' | 'is_submitted' | 'created_at' | 'picture_path'
  >
>;

export type DriverApplication = Prettify<
  SupabaseDriverApplication & {
    id: number;
    picture_src: string | null;
  }
>;

type DriverApplicationsResult = {
  data: DriverApplication[];
  count: number;
};

type Variables = {
  search?: string;
  rowFilter?: DriverApplicationsRowFilterState;
};

type Context = QueryFunctionContext<QueryKey, number>;

async function getDriverApplications(
  { search = '', rowFilter = 'all' }: Variables,
  { pageParam }: Context,
): Promise<DriverApplicationsResult> {
  const session = await queryClient.ensureQueryData(sessionOptions());

  const from = fetchSize * pageParam;
  const to = from + fetchSize - 1;

  let query = supabase
    .from('driver_application')
    .select(
      'id, name, is_submitted, picture_path, created_at',
      { count: 'estimated' },
    )
    .eq('auth_id', session.user.id);

  if (rowFilter === 'notSubmitted') query = query.eq('is_submitted', false);
  if (rowFilter === 'submitted') query = query.eq('is_submitted', true);

  query = query
    .order('created_at', { ascending: false })
    .or(`name.ilike.%${search}%, email.ilike.%${search}%`)
    .range(from, to);

  const { data, error, status, count } = await query.returns<DriverApplication[]>();

  // const { data, error, status, count } = await supabase
  //   .from('driver_application')
  //   .select(
  //     'name, is_submitted, picture_path, created_at',
  //     { count: 'estimated' },
  //   )
  //   .eq('auth_id', session.user.id)
  //   .eq('is_retired', isRetired)
  //   .order('created_at', { ascending: false })
  //   .or(`name.ilike.%${search}%, email.ilike.%${search}%, number_plate.ilike.%${search}%`)
  //   .range(from, to)
  //   .returns<DriverApplication[]>();

  if (status === 404) return { data: [], count: 0 };

  if (error) {
    throw new SupabaseError(error, status, {
      globalTitle: 'Could not fetch driver applications',
    });
  }

  const driverApplications = await Promise.all(
    data.map(async (application) => {
      const name = capitalizeEachWord(application.name ?? '');
      const picture_src = await queryClient.ensureQueryData(
        driverApplicationPictureQueryOptions({
          id: application.id,
          path: application.picture_path,
        }),
      );
      return { ...application, name, picture_src };
    }),
  );

  return {
    data: driverApplications,
    count: count ?? 0,
  };
}

export function driverApplicationsQueryOptions(options?: Variables) {
  const search = options?.search;
  const rowFilter = options?.rowFilter;

  return infiniteQueryOptions<
    DriverApplicationsResult,
    SupabaseError,
    InfiniteData<DriverApplicationsResult, number>,
    QueryKey,
    number
  >({
    queryKey: ['driverApplications', 'list', { search, rowFilter }],
    queryFn: (context) => getDriverApplications({ search, rowFilter }, context),
    initialPageParam: 0,
    getNextPageParam: (_lastGroup, groups) => groups.length,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
}

export function useDriverApplications(options?: Variables) {
  const query = useSuspenseInfiniteQuery(driverApplicationsQueryOptions(options));
  return query;
}

export function useNonSuspenseDriverApplications(options?: Variables) {
  const query = useInfiniteQuery(driverApplicationsQueryOptions(options));
  return query;
}
