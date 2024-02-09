import { Table, Header, RowData, Row } from '@tanstack/react-table';
import { Fragment, ReactNode } from 'react';
import { DataGridCard } from '@/features/tempTable/DataGridCard';

type Props<TData extends RowData> = {
  table: Table<TData>;
  render: (headers: Header<TData, unknown>[], data: Row<TData>) => ReactNode;
};

export function DataGrid<TData extends RowData>({ table, render }: Props<TData>) {
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
          <div key={row.id} className="">
            {render(table.getLeafHeaders(), row)}
          </div>
        ))
        // table.getRowModel().rows.map((row) => (
        //   <DataGridCard key={row.id} headerRow={table.getLeafHeaders()} dataRow={row} />
        // ))
      ) : (
        <p>No results.</p>
      )}
    </div>
  );
}
