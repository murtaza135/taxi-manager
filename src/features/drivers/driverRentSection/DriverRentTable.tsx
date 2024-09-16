import { useState, useMemo, useEffect } from 'react';
import { useReactTable, getCoreRowModel, RowSelectionState } from '@tanstack/react-table';
import { useParams } from 'react-router-dom';
import { DataView, DataViewTable } from '@/ui/dataview/DataView';
import { columns } from '@/features/rent/rentTable/columns';
import { useRents } from '@/features/rent/general/hooks/useRents';
import { useFetchOnScroll } from '@/hooks/useFetchOnScroll';
import { useSearchParam } from '@/hooks/useSearchParam';
import { useDriverRentsColumnVisibility } from '@/features/drivers/driverRentSection/useDriverRentsColumnVisibility';
import { RentRowFilterState } from '@/features/rent/general/types';

const rowFilters: RentRowFilterState[] = ['all', 'notPaid', 'paid'];

export function DriverRentTable() {
  const params = useParams();
  const driver_id = Number(params.id);
  const [globalFilterBase, setGlobalFilter] = useSearchParam<string>('search');
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useDriverRentsColumnVisibility();
  const globalFilter = globalFilterBase ?? '';

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
  } = useRents({ search: globalFilter, driver_id });

  const flatData = useMemo(
    () => data?.pages?.flatMap((page) => page.data) ?? [],
    [data],
  );

  const fetchedCount = flatData.length;
  const fetchableCount = data.pages[0].count;

  const table = useReactTable({
    data: flatData,
    columns: columns.table,
    getCoreRowModel: getCoreRowModel(),
    getRowId: ({ id }) => `${id}`,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    state: { globalFilter, rowSelection, columnVisibility },
    meta: {
      rowFilters,
      fetchedCount,
      fetchableCount,
    },
  });

  const { ref, fetchOnScroll } = useFetchOnScroll<HTMLDivElement>({
    fetchNext: fetchNextPage,
    hasMore: fetchedCount < fetchableCount,
    fetchCondition: !isFetchingNextPage,
    scrollThreshold: 500,
  });

  // a check on mount and after a fetch to see if the table is already
  // scrolled to the bottom and immediately needs to fetch more data
  useEffect(() => {
    void fetchOnScroll();
  }, [fetchOnScroll]);

  return (
    <DataView table={table}>
      <DataViewTable
        ref={ref}
        isFetching={isFetchingNextPage}
        onScroll={fetchOnScroll}
      />
    </DataView>
  );
}
