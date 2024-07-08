import { LayoutState } from '@tanstack/react-table';

export function layoutDeserializer(value: string): LayoutState {
  const val = JSON.parse(value) as unknown;
  if (val === 'table' || val === 'grid') return val;
  return 'table';
}
