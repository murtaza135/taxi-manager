import { useLocalStorage } from 'usehooks-ts';
import { VisibilityState } from '@tanstack/react-table';

export function useRentsColumnVisibility() {
  return useLocalStorage<VisibilityState>(
    'rents.dataview.column-visibility',
    {},
  );
}
