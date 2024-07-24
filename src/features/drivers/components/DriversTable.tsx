import { useState, useMemo, useEffect } from 'react';
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
import { useFetchOnScroll } from '@/hooks/useFetchOnScroll';

export function DriversTable() {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [layout, setLayout] = useLocalStorage<LayoutState>(
    'drivers.dataview.layout',
    'table',
    { deserializer: layoutDeserializer },
  );

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteDrivers(globalFilter);

  // TODO combine into useInfiniteDrivers
  const flatData = useMemo(
    () => data?.pages?.flatMap((page) => page.data) ?? [],
    [data],
  );

  const fetchedCount = flatData.length;
  const fetchableCount = data.pages[0].count;

  const table = useReactTable({
    data: flatData,
    columns: columns[layout],
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    state: { rowSelection, globalFilter },
    meta: { layout, onLayoutChange: setLayout, fetchedCount, fetchableCount },
  });

  const { ref, fetchOnScroll } = useFetchOnScroll<HTMLDivElement>({
    fetchNext: fetchNextPage,
    hasMore: fetchedCount < fetchableCount,
    fetchCondition: !isFetchingNextPage,
    scrollThreshold: layout === 'grid' ? 1000 : 500,
  });

  // a check on mount and after a fetch to see if the table is already
  // scrolled to the bottom and immediately needs to fetch more data
  useEffect(() => {
    void fetchOnScroll();
  }, [fetchOnScroll]);

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
          isFetching={isFetchingNextPage}
          onScroll={fetchOnScroll}
        />
      )}
      {layout === 'grid' && (
        <DataViewGrid
          mapper={mapper}
          ref={ref}
          isFetching={isFetchingNextPage}
          onScroll={fetchOnScroll}
        />
      )}
    </DataView>
  );
}
