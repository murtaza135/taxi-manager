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
  DataViewDeleteSelectedRowsButton,
  DataViewRowSelectionCount,
  DataViewSearchPopover,
  DataViewRowFilterDropdown,
  DataViewColumnVisibilityDropdown,
} from '@/ui/dataview/DataView';
import { columns, mapper } from '@/features/drivers/driverApplicationsTable/columns';
import { useDriverApplications } from '@/features/drivers/general/hooks/useDriverApplications';
import { Button } from '@/ui/Button';
import { useFetchOnScroll } from '@/hooks/useFetchOnScroll';
import { useSearchParam } from '@/hooks/useSearchParam';
import { useDriverApplicationsColumnVisibility } from '@/features/drivers/driverApplicationsTable/hooks/useDriverApplicationsColumnVisibility';
import { useDriverApplicationsLayout } from '@/features/drivers/driverApplicationsTable/hooks/useDriverApplicationsLayout';
import { useDriverApplicationsRowFilter } from '@/features/drivers/driverApplicationsTable/hooks/useDriverApplicationsRowFilter';
import { DriverApplicationsRowFilterState } from '@/features/drivers/general/types';
import { useBulkDeleteDriverApplications } from '@/features/drivers/general/hooks/useBulkDeleteDriverApplications';

const rowFilters: DriverApplicationsRowFilterState[] = ['all', 'notSubmitted', 'submitted'];

export function DriverApplicationsTable() {
  const [globalFilterBase, setGlobalFilter] = useSearchParam<string>('search');
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useDriverApplicationsColumnVisibility();
  const [layout, setLayout] = useDriverApplicationsLayout();
  const [rowFilter, setRowFilter] = useDriverApplicationsRowFilter();
  const globalFilter = globalFilterBase ?? '';

  const { mutateAsync: bulkDeleteDriverApplications } = useBulkDeleteDriverApplications();

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useDriverApplications({ search: globalFilter, rowFilter });

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
      onRowFilterChange: (filter) => setRowFilter(filter as DriverApplicationsRowFilterState),
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

  const handleDeleteDriverApplications = async (ids: string[]) => {
    await bulkDeleteDriverApplications(ids);
    table.resetRowSelection();
  };

  return (
    <DataView table={table}>
      <DataViewTopBar>
        <DataViewTopBarSection>
          <Link to="/drivers/add">
            <Button className="px-3 py-1">New</Button>
          </Link>
          <DataViewSearchPopover />
          <DataViewRowFilterDropdown />
          <DataViewLayoutDropdown />
          <DataViewColumnVisibilityDropdown />
          <Button variant="ghost" size="auto" className="text-xl center" onClick={() => refetch()}>
            <IoReload />
          </Button>
          <DataViewDeleteSelectedRowsButton
            onDelete={(ids) => handleDeleteDriverApplications(ids)}
          />
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
