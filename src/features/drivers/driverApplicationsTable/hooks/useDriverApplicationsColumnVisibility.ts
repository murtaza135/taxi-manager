import { useLocalStorage } from 'usehooks-ts';
import { VisibilityState } from '@tanstack/react-table';

export function useDriverApplicationsColumnVisibility() {
  return useLocalStorage<VisibilityState>(
    'driver-applications.dataview.column-visibility',
    {},
  );
}
