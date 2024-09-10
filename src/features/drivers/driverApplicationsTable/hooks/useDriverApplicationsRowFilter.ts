import { useLocalStorage } from 'usehooks-ts';
import { DriverApplicationsRowFilterState } from '@/features/drivers/general/types';

function rowFilterDeserializer(value: string): DriverApplicationsRowFilterState {
  const val = JSON.parse(value) as unknown;
  if (val === 'all' || val === 'submitted' || val === 'notSubmitted') return val;
  return 'all';
}

export function useDriverApplicationsRowFilter() {
  return useLocalStorage<DriverApplicationsRowFilterState>(
    'driver-applications.dataview.rowFilter',
    'all',
    { deserializer: rowFilterDeserializer },
  );
}
