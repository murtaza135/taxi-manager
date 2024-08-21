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
import { columns, mapper } from '@/features/taxis/taxiTable/columns';
import { useTaxis } from '@/features/taxis/general/hooks/useTaxis';
import { Button } from '@/ui/Button';
import { useFetchOnScroll } from '@/hooks/useFetchOnScroll';
import { useSearchParam } from '@/hooks/useSearchParam';
import { useTaxisColumnVisibility } from '@/features/taxis/taxiTable/hooks/useTaxisColumnVisibility';
import { useTaxisLayout } from '@/features/taxis/taxiTable/hooks/useTaxisLayout';
import { useSetTaxisRetirements } from '@/features/taxis/general/hooks/useSetTaxisRetirements';
import { useTaxisRowFilter } from '@/features/taxis/taxiTable/hooks/useTaxisRowFilter';
import { TaxisRowFilterState } from '@/features/taxis/general/types';

const rowFilters: TaxisRowFilterState[] = ['notRetired', 'retired'];

type HandleSetTaxisRetirementsAttributes = {
  ids: string[];
  isRetired: boolean;
};

export function TaxisTable() {
  const [globalFilterBase, setGlobalFilter] = useSearchParam<string>('search');
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useTaxisColumnVisibility();
  const [layout, setLayout] = useTaxisLayout();
  const [rowFilter, setRowFilter] = useTaxisRowFilter();
  const globalFilter = globalFilterBase ?? '';

  const { mutateAsync: setTaxisRetirements } = useSetTaxisRetirements();

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useTaxis({ search: globalFilter, isRetired: rowFilter !== 'notRetired' });

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
      onRowFilterChange: (filter) => setRowFilter(filter as TaxisRowFilterState),
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

  const handleSetTaxisRetirements = async ({
    ids,
    isRetired,
  }: HandleSetTaxisRetirementsAttributes) => {
    const idNumbers = ids
      .map((id) => Number(id))
      .filter((id) => !Number.isNaN(id));

    await setTaxisRetirements({ ids: idNumbers, isRetired });
    table.resetRowSelection();
  };

  return (
    <DataView table={table}>
      <DataViewTopBar>
        <DataViewTopBarSection>
          <Link to="/taxis/add">
            <Button className="px-3 py-1">New</Button>
          </Link>
          <DataViewSearchPopover />
          <DataViewRowFilterDropdown />
          <DataViewLayoutDropdown />
          <DataViewColumnVisibilityDropdown />
          <Button variant="ghost" size="auto" className="text-xl center" onClick={() => refetch()}>
            <IoReload />
          </Button>
          {rowFilter === 'notRetired' && (
            <DataViewDeleteSelectedRowsButton
              onDelete={(ids) => handleSetTaxisRetirements({ ids, isRetired: true })}
            />
          )}
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
