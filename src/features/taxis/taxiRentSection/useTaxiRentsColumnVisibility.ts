import { useLocalStorage } from 'usehooks-ts';
import { VisibilityState } from '@tanstack/react-table';

export function useTaxiRentsColumnVisibility() {
  return useLocalStorage<VisibilityState>(
    'taxi-rents.dataview.column-visibility',
    { Taxi: false },
  );
}
