import { useLocalStorage } from 'usehooks-ts';
import { TaxisRowFilterState } from '@/features/taxis/general/types';

function rowFilterDeserializer(value: string): TaxisRowFilterState {
  const val = JSON.parse(value) as unknown;
  if (val === 'retired' || val === 'notRetired') return val;
  return 'notRetired';
}

export function useTaxisRowFilter() {
  return useLocalStorage<TaxisRowFilterState>(
    'taxis.dataview.rowFilter',
    'notRetired',
    { deserializer: rowFilterDeserializer },
  );
}
