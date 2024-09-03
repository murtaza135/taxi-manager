import { useLocalStorage } from 'usehooks-ts';
import { VisibilityState } from '@tanstack/react-table';

export function useHiresColumnVisibility() {
  return useLocalStorage<VisibilityState>(
    'hires.dataview.column-visibility',
    {},
  );
}
