import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
  ColumnFiltersState,
  PaginationState,
} from '@tanstack/react-table';
import {
  DataViewTopBar,
  DataViewPagination,
  DataViewLayout,
  usePersistentDataViewLayout,
} from '@/ui/DataView';
import { columns, mapper } from '@/features/drivers/columns';
import { useDrivers } from '@/features/drivers/hooks/useDrivers';

export function DriversTable() {
  const { data } = useDrivers();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 50 });
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState('');
  const [layout, setLayout] = usePersistentDataViewLayout('drivers');

  const table = useReactTable({
    data,
    columns: columns[layout],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    state: { sorting, columnFilters, pagination, rowSelection, globalFilter },
  });

  return (
    <div className="flex flex-col gap-3">
      <DataViewTopBar
        table={table}
        showSortButton
        showVisibilityButton
        showRowsPerPageButton
        showGlobalFilterInput
        layout={layout}
        onChangeLayout={setLayout}
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
