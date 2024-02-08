import { Row, RowData } from '@tanstack/react-table';
import { Checkbox } from '@/ui/Checkbox';

type Props<TData extends RowData> = {
  row: Row<TData>;
};

export function DataTableCellCheckbox<TData extends RowData>({ row }: Props<TData>) {
  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
    />
  );
}
