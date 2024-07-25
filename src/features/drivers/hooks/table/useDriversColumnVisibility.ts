import { useLocalStorage } from 'usehooks-ts';
import { VisibilityState } from '@tanstack/react-table';

export function useDriversColumnVisibility() {
  return useLocalStorage<VisibilityState>(
    'drivers.dataview.column-visibility',
    {},
  );
}
