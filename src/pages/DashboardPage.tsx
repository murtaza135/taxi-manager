import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, SortingState, ColumnFiltersState, getFilteredRowModel } from '@tanstack/react-table';
import { useState } from 'react';
import { Title } from '@/features/title/components/Title';
import { DataTable } from '@/ui/Table';
import { columns } from '@/features/tempTable/columns';
import { data } from '@/features/tempTable/data';
import { DataTablePagination } from '@/features/tempTable/Pagination';
import { DataTableViewOptions } from '@/features/tempTable/ColumnToggle';
import { DataTableSearch } from '@/features/tempTable/DataTableSearch';

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
    <>
      <Title title="Dashboard" />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <DataTableSearch table={table} column="email" />
          <DataTableViewOptions table={table} />
        </div>
        <DataTable table={table} />
        <DataTablePagination table={table} />
      </div>
    </>
  );
}
