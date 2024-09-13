import { useSuspenseQuery, queryOptions } from '@tanstack/react-query';
import mapValues from 'lodash/mapValues';
import { supabase } from '@/config/api/supabaseClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { Tables } from '@/types/database';
import { queryClient } from '@/config/api/queryClient';
import { SupabaseError } from '@/errors/classes/SupabaseError';
import { Prettify, ReplaceNullWithUndefined } from '@/types/utils';

export type Settings = Prettify<
  ReplaceNullWithUndefined<
    Pick<
      Tables<'settings'>,
      'rent_day'
    >
  >
>;

async function getSettings(): Promise<Settings> {
  const session = await queryClient.ensureQueryData(sessionOptions());

  const { data, error, status } = await supabase
    .from('settings')
    .select('rent_day')
    .eq('auth_id', session.user.id)
    .limit(1)
    .single();

  if (error) {
    throw new SupabaseError(error, status, {
      globalTitle: 'Could not load settings',
    });
  }

  const mappedData = mapValues(data, (val) => val ?? undefined) as Settings;
  return mappedData;
}

export function settingsOptions() {
  return queryOptions<Settings, SupabaseError>({
    queryKey: ['auth', 'settings'],
    queryFn: getSettings,
  });
}

export function useSettings() {
  const query = useSuspenseQuery(settingsOptions());
  return query;
}
