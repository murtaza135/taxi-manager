import { Table, RowData } from '@tanstack/react-table';
import { Checkbox } from '@/ui/Checkbox';

type Props<TData extends RowData> = {
  table: Table<TData>;
};

export function DataTableHeaderCheckbox<TData extends RowData>({ table }: Props<TData>) {
  return (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected()
        || (table.getIsSomePageRowsSelected() && 'indeterminate')
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
    />
  );
}
