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
  RowSelectionState,
  LayoutState,
} from '@tanstack/react-table';
import { useLocalStorage } from 'usehooks-ts';
import { layoutDeserializer } from '@/lib/tanstack-table/utils';
import {
  ReactTable,
  DataViewTopBar,
  DataViewPagination,
  DataViewLayout,
} from '@/ui/DataView';
import { columns, mapper } from '@/features/drivers/columns';
import { useDrivers } from '@/features/drivers/hooks/useDrivers';

export function DriversTable() {
  const { data } = useDrivers();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50,
  });
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [layout, setLayout] = useLocalStorage<LayoutState>(
    'drivers.dataview.layout',
    'table',
    { deserializer: layoutDeserializer },
  );

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
    meta: { layout, onLayoutChange: setLayout },
    state: { sorting, columnFilters, pagination, rowSelection, globalFilter },
  });

  return (
    <div className="flex flex-col gap-3">
      <ReactTable table={table} mapper={mapper}>
        <DataViewTopBar
          showGlobalFilterInput
          showSortButton
          showVisibilityButton
          showRowsPerPageButton
          showLayoutButton
        />
        <DataViewLayout />
        <DataViewPagination
          showSelectedRows
          showPageCount
          showPageButtons
        />
      </ReactTable>
    </div>
  );
}
