import { useLocalStorage } from 'usehooks-ts';
import { VisibilityState } from '@tanstack/react-table';

export function useTaxisColumnVisibility() {
  return useLocalStorage<VisibilityState>(
    'taxis.dataview.column-visibility',
    {},
  );
}
