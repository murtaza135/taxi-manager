import { useLocalStorage } from 'usehooks-ts';
import { LayoutState } from '@tanstack/react-table';
import { layoutDeserializer } from '@/lib/tanstack-table/utils';

export function useDriversLayout() {
  return useLocalStorage<LayoutState>(
    'drivers.dataview.layout',
    'table',
    { deserializer: layoutDeserializer },
  );
}
