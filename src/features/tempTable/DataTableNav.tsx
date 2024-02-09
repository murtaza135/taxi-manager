import { Table, RowData } from '@tanstack/react-table';
import { useForm } from 'react-hook-form';
import { IoSearchSharp } from 'react-icons/io5';
import { BiSortDown } from 'react-icons/bi';
import { Input } from '@/ui/Input';
import { FormProvider } from '@/ui/Form';
import { Button } from '@/ui/Button';

type Props<TData extends RowData> = {
  table: Table<TData>;
  column: string;
};

export function DataTableNav<TData extends RowData>({ table, column }: Props<TData>) {
  const form = useForm({
    defaultValues: {
      filter: '',
    },
  });

  return (
    <div className="flex justify-between items-center gap-4">
      <FormProvider {...form}>
        <Input
          name="filter"
          placeholder={`Filter ${column}...`}
          value={(table.getColumn(column)?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn(column)?.setFilterValue(event.target.value)}
          icon={<IoSearchSharp />}
          className="max-w-40 py-[6px] border-none"
        />
      </FormProvider>

      <div className="flex gap-3 items-center">
        <Button size="circle-sm" className="text-2xl translate-y-[1px] text-achromatic-dark bg-transparent dark:bg-transparent dark:text-achromatic-light/70">
          <BiSortDown />
        </Button>
        <Button size="circle-sm" className="text-xl">+</Button>
      </div>
    </div>
  );
}
