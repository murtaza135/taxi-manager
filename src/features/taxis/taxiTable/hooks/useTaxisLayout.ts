import { useLocalStorage } from 'usehooks-ts';
import { LayoutState } from '@tanstack/react-table';
import { layoutDeserializer } from '@/lib/tanstack-table/utils';

export function useTaxisLayout() {
  return useLocalStorage<LayoutState>(
    'taxis.dataview.layout',
    'table',
    { deserializer: layoutDeserializer },
  );
}
