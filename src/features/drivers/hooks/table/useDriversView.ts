import { useLocalStorage } from 'usehooks-ts';
import { ViewState } from '@/features/drivers/types';

function viewDeserializer(value: string): ViewState {
  const val = JSON.parse(value) as unknown;
  if (val === 'retired' || val === 'notRetired') return val;
  return 'notRetired';
}

export function useDriversView() {
  return useLocalStorage<ViewState>(
    'drivers.dataview.layout',
    'notRetired',
    { deserializer: viewDeserializer },
  );
}
