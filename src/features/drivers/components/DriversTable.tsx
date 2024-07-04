import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
} from '@tanstack/react-table';
import {
  DataViewTopBar,
  DataViewPagination,
  DataViewLayoutType,
  DataViewLayout,
} from '@/ui/DataView';
import { columns, mapper } from '@/features/drivers/columns';
import { useDrivers } from '@/features/drivers/hooks/useDrivers';

export function DriversTable() {
  const { data } = useDrivers();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [layout, setLayout] = useState<DataViewLayoutType>('table');
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
      <DataViewPagination
        table={table}
        showSelectedRows
        showPageCount
        showPageButtons
      />
    </div>
  );
}
