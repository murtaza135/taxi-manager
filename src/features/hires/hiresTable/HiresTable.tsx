import { useState, useMemo, useEffect } from 'react';
import { useReactTable, getCoreRowModel, RowSelectionState } from '@tanstack/react-table';
import { IoReload } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import {
  DataView,
  DataViewTopBar,
  DataViewTopBarSection,
  DataViewTable,
  DataViewGrid,
  DataViewLayoutDropdown,
  DataViewRowSelectionCount,
  DataViewSearchPopover,
  DataViewRowFilterDropdown,
  DataViewColumnVisibilityDropdown,
} from '@/ui/dataview/DataView';
import { columns, mapper } from '@/features/hires/hiresTable/columns';
import { useHires } from '@/features/hires/general/hooks/useHires';
import { Button } from '@/ui/Button';
import { useFetchOnScroll } from '@/hooks/useFetchOnScroll';
import { useSearchParam } from '@/hooks/useSearchParam';
import { useHiresColumnVisibility } from '@/features/hires/hiresTable/hooks/useHiresColumnVisibility';
import { useHiresLayout } from '@/features/hires/hiresTable/hooks/useHiresLayout';
import { useHiresRowFilter } from '@/features/hires/hiresTable/hooks/useHiresRowFilter';
import { HiresRowFilterState } from '@/features/hires/general/types';

const rowFilters: HiresRowFilterState[] = ['inProgress', 'terminated'];

export function HiresTable() {
  const [globalFilterBase, setGlobalFilter] = useSearchParam<string>('search');
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useHiresColumnVisibility();
  const [layout, setLayout] = useHiresLayout();
  const [rowFilter, setRowFilter] = useHiresRowFilter();
  const globalFilter = globalFilterBase ?? '';

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useHires({ search: globalFilter, isRetired: rowFilter !== 'inProgress' });

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
    getRowId: ({ id }) => `${id}`,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    state: { globalFilter, rowSelection, columnVisibility },
    meta: {
      layout,
      onLayoutChange: setLayout,
      rowFilters,
      rowFilter,
      onRowFilterChange: (filter) => setRowFilter(filter as HiresRowFilterState),
      fetchedCount,
      fetchableCount,
    },
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
          <Link to="/hires/add">
            <Button className="px-3 py-1">New</Button>
          </Link>
          <DataViewSearchPopover />
          <DataViewRowFilterDropdown />
          <DataViewLayoutDropdown />
          <DataViewColumnVisibilityDropdown />
          <Button variant="ghost" size="auto" className="text-xl center" onClick={() => refetch()}>
            <IoReload />
          </Button>
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
