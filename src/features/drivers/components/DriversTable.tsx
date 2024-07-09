import { useState, useMemo } from 'react';
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
  DataViewTopBar,
  DataViewPagination,
  DataViewLayout,
} from '@/ui/DataView';
import { columns, mapper } from '@/features/drivers/columns';
import { useDrivers } from '@/features/drivers/hooks/useDrivers';
import { ReactTable } from '@/lib/tanstack-table/ReactTable';
import { useInfiniteDrivers } from '@/features/drivers/hooks/useInfiniteDrivers';
import { Button } from '@/ui/Button';

export function DriversTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 1000,
  });
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [layout, setLayout] = useLocalStorage<LayoutState>(
    'drivers.dataview.layout',
    'table',
    { deserializer: layoutDeserializer },
  );

  // const { data } = useDrivers();
  const { data, fetchNextPage, isFetching, isLoading, status } = useInfiniteDrivers();

  const flatData = useMemo(
    () => data?.pages?.flatMap((page) => page) ?? [],
    [data],
  );

  console.log(status);
  console.log(isFetching);

  const table = useReactTable({
    data: flatData,
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
      <ReactTable table={table}>
        <DataViewTopBar
          showGlobalFilterInput
          showSortButton
          showVisibilityButton
          showRowsPerPageButton
          showLayoutButton
        />
        <DataViewLayout mapper={mapper} />
        <DataViewPagination
          showSelectedRows
          showPageCount
          showPageButtons
        />
      </ReactTable>
      <Button
        variant="primary"
        onClick={() => fetchNextPage()}
      >
        Load More
      </Button>
      {isFetching && <p>Loading More...</p>}
    </div>
  );
}
