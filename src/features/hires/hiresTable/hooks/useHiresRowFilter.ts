import { useLocalStorage } from 'usehooks-ts';
import { HiresRowFilterState } from '@/features/hires/general/types';

function rowFilterDeserializer(value: string): HiresRowFilterState {
  const val = JSON.parse(value) as unknown;
  if (val === 'retired' || val === 'notRetired') return val;
  return 'notRetired';
}

export function useHiresRowFilter() {
  return useLocalStorage<HiresRowFilterState>(
    'hires.dataview.rowFilter',
    'notRetired',
    { deserializer: rowFilterDeserializer },
  );
}
