import { useLocalStorage } from 'usehooks-ts';
import { LayoutState } from '@tanstack/react-table';
import { layoutDeserializer } from '@/lib/tanstack-table/utils';

export function useRentsLayout() {
  return useLocalStorage<LayoutState>(
    'rents.dataview.layout',
    'table',
    { deserializer: layoutDeserializer },
  );
}
