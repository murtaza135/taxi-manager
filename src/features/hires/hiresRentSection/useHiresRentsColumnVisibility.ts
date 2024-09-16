import { useLocalStorage } from 'usehooks-ts';
import { VisibilityState } from '@tanstack/react-table';

export function useHiresRentsColumnVisibility() {
  return useLocalStorage<VisibilityState>(
    'hires-rents.dataview.column-visibility',
    { 'Hire ID': false },
  );
}
