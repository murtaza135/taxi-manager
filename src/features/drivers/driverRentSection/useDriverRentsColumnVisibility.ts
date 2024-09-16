import { useLocalStorage } from 'usehooks-ts';
import { VisibilityState } from '@tanstack/react-table';

export function useDriverRentsColumnVisibility() {
  return useLocalStorage<VisibilityState>(
    'driver-rents.dataview.column-visibility',
    { Driver: false },
  );
}
