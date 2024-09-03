import { useLocalStorage } from 'usehooks-ts';
import { HiresRowFilterState } from '@/features/hires/general/types';

function rowFilterDeserializer(value: string): HiresRowFilterState {
  const val = JSON.parse(value) as unknown;
  if (val === 'terminated' || val === 'inProgress') return val;
  return 'inProgress';
}

export function useHiresRowFilter() {
  return useLocalStorage<HiresRowFilterState>(
    'hires.dataview.rowFilter',
    'inProgress',
    { deserializer: rowFilterDeserializer },
  );
}
