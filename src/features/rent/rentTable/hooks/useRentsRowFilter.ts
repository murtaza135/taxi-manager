import { useLocalStorage } from 'usehooks-ts';
import { RentRowFilterState } from '@/features/rent/general/types';

function rowFilterDeserializer(value: string): RentRowFilterState {
  const val = JSON.parse(value) as unknown;
  if (val === 'all' || val === 'notPaid' || val === 'paid') return val;
  return 'all';
}

export function useRentsRowFilter() {
  return useLocalStorage<RentRowFilterState>(
    'rents.dataview.rowFilter',
    'all',
    { deserializer: rowFilterDeserializer },
  );
}
