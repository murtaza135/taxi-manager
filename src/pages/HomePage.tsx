import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, SortingState, ColumnFiltersState, getFilteredRowModel } from '@tanstack/react-table';
import { useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { Title } from '@/features/title/components/Title';
import {
  DataViewTopBar,
  DataViewPagination,
  DataViewLayoutType,
  DataViewLayout,
} from '@/ui/DataView';
import { columns, mapper } from '@/features/tempTable/columns';
import { data } from '@/features/tempTable/data';

export default function HomePage() {
  const [sorting, setSorting] = useLocalStorage<SortingState>('dashboard-dataview-sorting', []);
  const [columnFilters, setColumnFilters] = useLocalStorage<ColumnFiltersState>('dashboard-dataview-column-filters', []);
  const [rowSelection, setRowSelection] = useState({});
  const [layout, setLayout] = useLocalStorage<DataViewLayoutType>('dashboard-dataview-layout', 'table');
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data,
    columns: columns[layout],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    state: { sorting, columnFilters, rowSelection, globalFilter },
  });

  return (
    <>
      <Title title="Home" />
      <div className="flex flex-col gap-3">
        <DataViewTopBar
          table={table}
          showSortButton
          showVisibilityButton
          showRowsPerPageButton
          layout={layout}
          onChangeLayout={setLayout}
          filter={globalFilter}
          onChangeFilter={setGlobalFilter}
        />
        <DataViewLayout
          layout={layout}
          table={table}
          mapper={mapper}
        />
        <DataViewPagination table={table} showSelectedRows />
      </div>
    </>
  );
}
