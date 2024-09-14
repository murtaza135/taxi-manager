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
import { columns, mapper } from '@/features/rent/rentTable/columns';
import { useRents } from '@/features/rent/general/hooks/useRents';
import { Button } from '@/ui/Button';
import { useFetchOnScroll } from '@/hooks/useFetchOnScroll';
import { useSearchParam } from '@/hooks/useSearchParam';
import { useRentsColumnVisibility } from '@/features/rent/rentTable/hooks/useRentsColumnVisbility';
import { useRentsLayout } from '@/features/rent/rentTable/hooks/useRentsLayout';
import { useDeleteRents } from '@/features/rent/general/hooks/useDeleteRents';
import { useRentsRowFilter } from '@/features/rent/rentTable/hooks/useRentsRowFilter';
import { RentRowFilterState } from '@/features/rent/general/types';

const rowFilters: RentRowFilterState[] = ['all', 'notPaid', 'paid'];

export function RentsTable() {
  const [globalFilterBase, setGlobalFilter] = useSearchParam<string>('search');
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useRentsColumnVisibility();
  const [layout, setLayout] = useRentsLayout();
  const [rowFilter, setRowFilter] = useRentsRowFilter();
  const globalFilter = globalFilterBase ?? '';

  // const { mutateAsync: setRentsRetirements } = useSetRentsRetirements();
  const { mutateAsync: deleteRents } = useDeleteRents();

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useRents({ search: globalFilter, rowFilter });

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
      onRowFilterChange: (filter) => setRowFilter(filter as RentRowFilterState),
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

  const handleDeleteRents = async (ids: string[]) => {
    const idNumbers = ids
      .map((id) => Number(id))
      .filter((id) => !Number.isNaN(id));

    await deleteRents(idNumbers);
    table.resetRowSelection();
  };

  return (
    <DataView table={table}>
      <DataViewTopBar>
        <DataViewTopBarSection>
          <Link to="/rents/add">
            <Button className="px-3 py-1">New</Button>
          </Link>
          <DataViewSearchPopover />
          <DataViewRowFilterDropdown />
          <DataViewLayoutDropdown />
          <DataViewColumnVisibilityDropdown />
          <Button variant="ghost" size="auto" className="text-xl center" onClick={() => refetch()}>
            <IoReload />
          </Button>
          <DataViewDeleteSelectedRowsButton onDelete={handleDeleteRents} />
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
