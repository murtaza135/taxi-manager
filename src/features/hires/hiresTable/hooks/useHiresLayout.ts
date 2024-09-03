import { useLocalStorage } from 'usehooks-ts';
import { LayoutState } from '@tanstack/react-table';
import { layoutDeserializer } from '@/lib/tanstack-table/utils';

export function useHiresLayout() {
  return useLocalStorage<LayoutState>(
    'hires.dataview.layout',
    'table',
    { deserializer: layoutDeserializer },
  );
}
