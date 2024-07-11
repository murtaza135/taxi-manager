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
  DataViewTopBar,
  DataViewPagination,
  DataViewLayout,
  DataViewTopBarSection,
  DataViewSearchFilter,
  DataViewRowsPerPageDropdown,
  DataViewLayoutDropdown,
  DataViewRowSelectionCount,
} from '@/ui/DataView';
import { columns, mapper } from '@/features/drivers/columns';
import { ReactTable } from '@/lib/tanstack-table/ReactTable';
import { useInfiniteDrivers } from '@/features/drivers/hooks/useInfiniteDrivers';
import { Button } from '@/ui/Button';
import { useDriverCount } from '@/features/drivers/hooks/useDriverCount';
import { Separator } from '@/ui/Separator';

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
  const tableContainerRef = useRef<HTMLElement>(null);

  // const { data } = useDrivers();
  const { data, fetchNextPage, isFetching } = useInfiniteDrivers(globalFilter);
  const { data: count } = useDriverCount();

  const flatData = useMemo(
    () => data?.pages?.flatMap((page) => page) ?? [],
    [data],
  );

  const totalFetched = flatData.length;
  console.log(Object.keys(rowSelection).length);

  // console.log(status);
  // console.log(isFetching);

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
  // const fetchMoreOnBottomReached = useCallback(
  //   (containerRefElement?: HTMLElement | null) => {
  //     if (containerRefElement) {
  //       const { scrollHeight, scrollTop, clientHeight } = containerRefElement;

  //       // console.log('calc:', scrollHeight - scrollTop - clientHeight);
  //       console.log('isFetching:', isFetching);
  //       console.log('totalFetched:', totalFetched);
  //       console.log('totalCount:', count);

  //       // once the user has scrolled within 500px of the bottom of the table, fetch more data if we can
  //       if (
  //         scrollHeight - scrollTop - clientHeight < 500
  //         && !isFetching
  //         && totalFetched < count
  //       ) {
  //         void fetchNextPage();
  //       }
  //     }
  //   },
  //   [fetchNextPage, isFetching, totalFetched, count],
  // );

  // const { scrollHeight, scrollTop, clientHeight } = document.body;
  // const { scrollX, screenY, innerHeight, outerHeight, screenTop } = window;
  // console.log('screenY:', screenY);
  // console.log('screenTop:', screenTop);
  // console.log('innerHeight:', innerHeight);
  // console.log('outerHeight:', outerHeight);
  // console.log('calc:', scrollHeight - scrollTop - clientHeight);

  // a check on mount and after a fetch to see if the table is already scrolled to the bottom and immediately needs to fetch more data
  // useEffect(() => {
  //   fetchMoreOnBottomReached(document.body);
  // }, [fetchMoreOnBottomReached]);

  return (
    <div className="flex flex-col gap-3">
      <ReactTable table={table}>
        {/* <DataViewTopBar
          showGlobalFilterInput
          // showSortButton
          showVisibilityButton
          // showRowsPerPageButton
          showLayoutButton
        /> */}
        <DataViewTopBar>
          <DataViewTopBarSection>
            <Button size="sm" shape="circle" className="text-xl ml-2">+</Button>
            <DataViewLayoutDropdown />
            <DataViewRowsPerPageDropdown />
          </DataViewTopBarSection>
          <DataViewTopBarSection>
            <DataViewRowSelectionCount />
          </DataViewTopBarSection>
        </DataViewTopBar>
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
