import { Table, RowData } from '@tanstack/react-table';
import { useForm } from 'react-hook-form';
import { Input } from '@/ui/Input';
import { FormProvider } from '@/ui/Form';

type Props<TData extends RowData> = {
  table: Table<TData>;
  column: string;
};

export function DataTableSearch<TData extends RowData>({ table, column }: Props<TData>) {
  const form = useForm({
    defaultValues: {
      filter: '',
    },
  });

  return (
    <FormProvider {...form}>
      <Input
        name="filter"
        placeholder={`Filter ${column}...`}
        value={(table.getColumn(column)?.getFilterValue() as string) ?? ''}
        onChange={(event) => table.getColumn(column)?.setFilterValue(event.target.value)}
        className="max-w-sm"
      />
    </FormProvider>
  );
}
