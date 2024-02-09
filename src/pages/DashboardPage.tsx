import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, SortingState, ColumnFiltersState, getFilteredRowModel } from '@tanstack/react-table';
import { useState } from 'react';
import { Title } from '@/features/title/components/Title';
// import { DataTable } from '@/ui/Table';
import { DataViewTable, DataViewGrid, DataViewSearchFilter, DataViewTopBar, DataViewPagination } from '@/ui/DataView';
import { columns } from '@/features/tempTable/columns';
import { data } from '@/features/tempTable/data';
import { Separator } from '@/ui/Separator';
// import { DataGrid } from '@/features/tempTable/DataGrid';
import { DataViewCard } from '@/ui/DataViewCard';

export function DashboardPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, rowSelection },
  });

  return (
    <div>
      <Title title="Dashboard" />
      <div className="flex flex-col gap-3">
        <DataViewTopBar table={table} column="email" />
        <Separator />
        {/* <DataViewTable table={table} /> */}
        <DataViewGrid
          table={table}
          render={(headers, dataRow) => (
            <DataViewCard headerRow={headers} dataRow={dataRow} />
          )}
        />
        <Separator />
        <DataViewPagination table={table} />
      </div>
    </div>
  );
}
