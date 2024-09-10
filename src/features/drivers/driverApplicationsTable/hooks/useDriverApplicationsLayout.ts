import { useLocalStorage } from 'usehooks-ts';
import { LayoutState } from '@tanstack/react-table';
import { layoutDeserializer } from '@/lib/tanstack-table/utils';

export function useDriverApplicationsLayout() {
  return useLocalStorage<LayoutState>(
    'driver-applications.dataview.layout',
    'table',
    { deserializer: layoutDeserializer },
  );
}
