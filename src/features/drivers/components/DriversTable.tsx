import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
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
  DataView,
  DataViewTopBar,
  DataViewTopBarSection,
  DataViewPagination,
  // DataViewLayout,
  DataViewTable,
  DataViewGrid,
  // DataViewSearchFilter,
  DataViewRowsPerPageDropdown,
  DataViewLayoutDropdown,
  DataViewRowSelectionCount,
  DataViewSearchPopover,
} from '@/ui/DataView';
import { columns, mapper } from '@/features/drivers/columns';
import { ReactTable } from '@/lib/tanstack-table/ReactTable';
import { useInfiniteDrivers } from '@/features/drivers/hooks/useInfiniteDrivers';
import { Button } from '@/ui/Button';
import { useDriverCount } from '@/features/drivers/hooks/useDriverCount';
import { Separator } from '@/ui/Separator';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/Popover';

export function DriversTable() {
  // const [sorting, setSorting] = useState<SortingState>([]);
  // const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  // const [pagination, setPagination] = useState<PaginationState>({
  //   pageIndex: 0,
  //   pageSize: 1000,
  // });
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [layout, setLayout] = useLocalStorage<LayoutState>(
    'drivers.dataview.layout',
    'table',
    { deserializer: layoutDeserializer },
  );

  // we need a reference to the scrolling element for logic down below
  const tableContainerRef = useRef<HTMLDivElement>(null);

  // const { data } = useDrivers();
  const { data, fetchNextPage, isFetching } = useInfiniteDrivers(globalFilter);
  const { data: count } = useDriverCount();

  const flatData = useMemo(
    () => data?.pages?.flatMap((page) => page) ?? [],
    [data],
  );

  const totalFetched = flatData.length;
  // console.log(Object.keys(rowSelection).length);

  // console.log(status);
  // console.log(isFetching);

  const noData = useMemo(() => [], []);

  const table = useReactTable({
    data: flatData,
    columns: columns[layout],
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    // getSortedRowModel: getSortedRowModel(),
    // getFilteredRowModel: getFilteredRowModel(),
    // onSortingChange: setSorting,
    // onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    // onPaginationChange: setPagination,
    state: { rowSelection, globalFilter },
    meta: { layout, onLayoutChange: setLayout, totalCount: count },
    // state: { sorting, columnFilters, pagination, rowSelection, globalFilter },
  });

  // called on scroll and possibly on mount to fetch more data as the user scrolls and reaches bottom of table
  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement?: HTMLElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
        const delta = layout === 'grid' ? 1000 : 500;

        // once the user has scrolled within `delta` px of the bottom of the table, fetch more data if we can
        if (
          scrollHeight - scrollTop - clientHeight < delta
          && !isFetching
          && totalFetched < count
        ) {
          void fetchNextPage();
        }
      }
    },
    [fetchNextPage, isFetching, totalFetched, count, layout],
  );

  // a check on mount and after a fetch to see if the table is already scrolled to the bottom and immediately needs to fetch more data
  useEffect(() => {
    fetchMoreOnBottomReached(tableContainerRef.current);
  }, [fetchMoreOnBottomReached]);

  return (
    <>
      <DataView table={table}>
        <DataViewTopBar>
          <DataViewTopBarSection>
            <Button size="sm" shape="circle" className="text-xl ml-2">+</Button>
            <DataViewSearchPopover />
            <DataViewLayoutDropdown />
            <DataViewRowsPerPageDropdown />
          </DataViewTopBarSection>
          <DataViewTopBarSection>
            <DataViewRowSelectionCount />
          </DataViewTopBarSection>
        </DataViewTopBar>
        {layout === 'table' && (
          <DataViewTable
            ref={tableContainerRef}
            onScroll={(event) => fetchMoreOnBottomReached(event.target as HTMLDivElement)}
          />
        )}
        {layout === 'grid' && (
          <DataViewGrid
            mapper={mapper}
            ref={tableContainerRef}
            onScroll={(event) => fetchMoreOnBottomReached(event.target as HTMLDivElement)}
          />
        )}
      </DataView>
      {/* <Button
        variant="primary"
        onClick={() => fetchNextPage()}
      >
        Load More
      </Button>
      {isFetching && <p>Loading More...</p>} */}
    </>
  );
}
