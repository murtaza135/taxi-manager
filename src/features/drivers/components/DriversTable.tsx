import { useState, useMemo, useEffect, useRef } from 'react';
import { useReactTable, getCoreRowModel, RowSelectionState, LayoutState } from '@tanstack/react-table';
import { useLocalStorage } from 'usehooks-ts';
import { layoutDeserializer } from '@/lib/tanstack-table/utils';
import {
  DataView,
  DataViewTopBar,
  DataViewTopBarSection,
  DataViewTable,
  DataViewGrid,
  DataViewLayoutDropdown,
  DataViewRowSelectionCount,
  DataViewSearchPopover,
  DataViewColumnVisibilityDropdown,
} from '@/ui/DataView';
import { columns, mapper } from '@/features/drivers/columns';
import { useInfiniteDrivers } from '@/features/drivers/hooks/useInfiniteDrivers';
import { Button } from '@/ui/Button';
import { usePrefetchOnScroll } from '@/hooks/usePrefetchOnScroll';

export function DriversTable() {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [layout, setLayout] = useLocalStorage<LayoutState>(
    'drivers.dataview.layout',
    'table',
    { deserializer: layoutDeserializer },
  );

  const { data, fetchNextPage, isFetching } = useInfiniteDrivers(globalFilter);

  const flatData = useMemo(
    () => data?.pages?.flatMap((page) => page.data) ?? [],
    [data],
  );

  const fetchedCount = flatData.length;
  const totalFetchableCount = data.pages[0].count;

  const table = useReactTable({
    data: flatData,
    columns: columns[layout],
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    state: { rowSelection, globalFilter },
    meta: { layout, onLayoutChange: setLayout, fetchedCount, totalFetchableCount },
  });

  // we need a reference to the scrolling element for logic down below
  // const ref = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line max-len
  const { ref, isFetching: isFetchingData, prefetchOnScroll } = usePrefetchOnScroll<HTMLDivElement>({
    fetchFn: fetchNextPage,
    isFetching,
    deltaFromBottom: layout === 'grid' ? 1000 : 500,
    fetchedCount: flatData.length,
    totalFetchableCount: data.pages[0].count,
  });

  // a check on mount and after a fetch to see if the table is already
  // scrolled to the bottomand immediately needs to fetch more data
  useEffect(() => {
    void prefetchOnScroll();
  }, [prefetchOnScroll]);

  return (
    <DataView table={table}>
      <DataViewTopBar>
        <DataViewTopBarSection>
          <Button size="sm" shape="circle" className="text-xl ml-2">+</Button>
          <DataViewSearchPopover />
          <DataViewLayoutDropdown />
          <DataViewColumnVisibilityDropdown />
        </DataViewTopBarSection>
        <DataViewTopBarSection>
          <DataViewRowSelectionCount />
        </DataViewTopBarSection>
      </DataViewTopBar>
      {layout === 'table' && (
        <DataViewTable
          ref={ref}
          isFetching={isFetchingData}
          onScroll={prefetchOnScroll}
        />
      )}
      {layout === 'grid' && (
        <DataViewGrid
          mapper={mapper}
          ref={ref}
          isFetching={isFetchingData}
          onScroll={prefetchOnScroll}
        />
      )}
    </DataView>
  );
}
