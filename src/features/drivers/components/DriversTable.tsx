import { useState, useMemo, useEffect } from 'react';
import { useReactTable, getCoreRowModel, RowSelectionState } from '@tanstack/react-table';
import { IoReload, IoFileTrayFull } from 'react-icons/io5';
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
  DataViewColumnVisibilityDropdown,
} from '@/ui/dataview/DataView';
import { columns, mapper } from '@/features/drivers/columns';
import { useInfiniteDrivers } from '@/features/drivers/hooks/queries/useInfiniteDrivers';
import { Button } from '@/ui/Button';
import { useFetchOnScroll } from '@/hooks/useFetchOnScroll';
import { useSearchParam } from '@/hooks/useSearchParam';
import { useDriversColumnVisibility } from '@/features/drivers/hooks/table/useDriversColumnVisibility';
import { useDriversLayout } from '@/features/drivers/hooks/table/useDriversLayout';
import { useDeleteDrivers } from '@/features/drivers/hooks/mutations/useDeleteDrivers';
import { useDriversView } from '@/features/drivers/hooks/table/useDriversView';
import { DriversViewDropdown } from '@/features/drivers/components/DriversViewDropdown';

export function DriversTable() {
  const [globalFilterBase, setGlobalFilter] = useSearchParam<string>('search');
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useDriversColumnVisibility();
  const [layout, setLayout] = useDriversLayout();
  const [view, setView] = useDriversView();
  const globalFilter = globalFilterBase ?? '';

  const { mutateAsync: deleteDrivers } = useDeleteDrivers();

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteDrivers({ search: globalFilter, view });

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

  const handleDeleteDrivers = async (ids: string[]) => {
    const idNumbers = ids
      .map((id) => Number(id))
      .filter((id) => !Number.isNaN(id));

    await deleteDrivers(idNumbers);
    table.resetRowSelection();
  };

  return (
    <DataView table={table}>
      <DataViewTopBar>
        <DataViewTopBarSection>
          <Button size="sm" shape="circle" className="text-xl">+</Button>
          <DataViewSearchPopover />
          <DriversViewDropdown view={view} onViewChange={setView} />
          <DataViewLayoutDropdown />
          <DataViewColumnVisibilityDropdown />
          <Button variant="ghost" size="auto" className="text-xl center" onClick={() => refetch()}>
            <IoReload />
          </Button>
          <DataViewDeleteSelectedRowsButton onDelete={handleDeleteDrivers} />
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
