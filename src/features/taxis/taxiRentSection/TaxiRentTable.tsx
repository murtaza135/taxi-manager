import { useState, useMemo, useEffect } from 'react';
import { useReactTable, getCoreRowModel, RowSelectionState, VisibilityState } from '@tanstack/react-table';
import { useParams } from 'react-router-dom';
import { DataView, DataViewTable } from '@/ui/dataview/DataView';
import { columns } from '@/features/rent/rentTable/columns';
import { useRents } from '@/features/rent/general/hooks/useRents';
import { useFetchOnScroll } from '@/hooks/useFetchOnScroll';

export function TaxiRentTable() {
  const params = useParams();
  const taxi_id = Number(params.id);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({ Taxi: false });
  const { data, fetchNextPage, isFetchingNextPage } = useRents({ taxi_id });

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
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    state: { rowSelection, columnVisibility },
    meta: { fetchedCount, fetchableCount },
  });

  const { ref, fetchOnScroll } = useFetchOnScroll<HTMLDivElement>({
    fetchNext: fetchNextPage,
    hasMore: fetchedCount < fetchableCount,
    fetchCondition: !isFetchingNextPage,
    scrollThreshold: 500,
  });

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
