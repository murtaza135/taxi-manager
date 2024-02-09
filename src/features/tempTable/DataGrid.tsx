import { Table, RowData } from '@tanstack/react-table';
import { DataGridCard } from '@/features/tempTable/DataGridCard';

type Props<TData extends RowData> = {
  table: Table<TData>;
};

export function DataGrid<TData extends RowData>({ table }: Props<TData>) {
  // return (
  //   <div className="grid grid-cols-[repeat(auto-fit,minmax(13rem,1fr))] gap-4">
  //     <DataGridCard />
  //     <DataGridCard />
  //     <DataGridCard />
  //   </div>
  // );

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(13rem,1fr))] gap-4">
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <DataGridCard key={row.id} headers={table.getLeafHeaders()} data={row} />
        ))
      ) : (
        <p>No results.</p>
      )}
    </div>
  );
}
