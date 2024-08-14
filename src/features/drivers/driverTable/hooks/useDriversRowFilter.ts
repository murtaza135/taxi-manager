import { useLocalStorage } from 'usehooks-ts';
import { DriversRowFilterState } from '@/features/drivers/general/types';

function rowFilterDeserializer(value: string): DriversRowFilterState {
  const val = JSON.parse(value) as unknown;
  if (val === 'retired' || val === 'notRetired') return val;
  return 'notRetired';
}

export function useDriversRowFilter() {
  return useLocalStorage<DriversRowFilterState>(
    'drivers.dataview.rowFilter',
    'notRetired',
    { deserializer: rowFilterDeserializer },
  );
}
