import { useRef } from 'react';
import {
  Table as ReactTable,
  Header as ReactTableHeader,
  Row as ReactTableRow,
  RowData as ReactTableRowData,
  Column as ReactTableColumn,
  Cell as ReactTableCell,
  flexRender,
} from '@tanstack/react-table';
import { IoSearchSharp } from 'react-icons/io5';
import { MdOutlineClose } from 'react-icons/md';
import { CgHashtag } from 'react-icons/cg';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { BiSortAlt2 } from 'react-icons/bi';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { RiArrowLeftDoubleFill, RiArrowRightDoubleFill } from 'react-icons/ri';
import { ArrowDownIcon, ArrowUpIcon, CaretSortIcon, EyeNoneIcon } from '@radix-ui/react-icons';
import { TbColumnRemove } from 'react-icons/tb';
import { Check } from 'lucide-react';
import { FiLayout } from 'react-icons/fi';
import chunk from 'lodash/chunk';
import partition from 'lodash/partition';
import keyBy from 'lodash/keyBy';
import mapValues from 'lodash/mapValues';
import { capitalCase } from 'change-case';
import { useLocalStorage } from 'usehooks-ts';
import { flexRenderHeader, flexRenderCell } from '@/lib/tanstack-table/flexRender';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/ui/Table';
import { Input } from '@/ui/Input';
import { Button } from '@/ui/Button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/ui/DropdownMenu';
import { Checkbox } from '@/ui/Checkbox';
import { cn } from '@/utils/cn';
import { OptionalObjectGroup } from '@/types/utils';
import { Separator } from '@/ui/Separator';

const DATA_VIEW_LAYOUTS = ['table', 'grid'] as const;
export type DataViewLayoutType = typeof DATA_VIEW_LAYOUTS[number];

type DataViewTableProps<TData extends ReactTableRowData> = {
  table: ReactTable<TData>;
};

function DataViewTable<TData extends ReactTableRowData>({ table }: DataViewTableProps<TData>) {
  // eslint-disable-next-line no-underscore-dangle
  const columnDefs = table._getColumnDefs();

  return (
    <div className="rounded-md overflow-auto w-full scrollbar">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columnDefs.length} className="h-24 text-center">
                No Results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

type DataViewCardCellPair<TData extends ReactTableRowData> = [
  ReactTableCell<TData, unknown>,
  ReactTableCell<TData, unknown> | undefined,
];

export type DataViewCardMainDataMapper = {
  image?: string;
  avatar?: string;
  title?: string;
  subtitle?: string;
  optionsTop?: string;
  optionsBottom?: string;
};

type DataViewCardProps<TData extends ReactTableRowData> = {
  headerRow: Record<string, ReactTableHeader<TData, unknown>>;
  dataRow: ReactTableRow<TData>;
  mapper?: DataViewCardMainDataMapper;
};

function DataViewCard<TData extends ReactTableRowData>(
  { headerRow, dataRow, mapper = {} }: DataViewCardProps<TData>,
) {
  // TODO comment on whats going on here and simplify if possible
  const mapperValues = Object.values(mapper);
  const [mainDataCells, listDataCells] = partition(
    dataRow.getVisibleCells(),
    (cell) => mapperValues.includes(cell.column.id),
  );

  const mainDataCellsObject = keyBy(mainDataCells, (cell) => cell.column.id);
  const mainDataCellsMap = mapValues(
    mapper,
    (value) => (value ? mainDataCellsObject[value] : undefined),
  );

  const listDataCellPairs = chunk(listDataCells, 2) as DataViewCardCellPair<TData>[];

  const imageSrc = mainDataCellsMap.image?.renderValue<string>();
  const avatarElement = flexRenderCell(mainDataCellsMap.avatar);
  const optionsTopElement = flexRenderCell(mainDataCellsMap.optionsTop);
  const optionsBottomElement = flexRenderCell(mainDataCellsMap.optionsBottom);
  const titleElement = flexRenderCell(mainDataCellsMap.title);
  const subtitleElement = flexRenderCell(mainDataCellsMap.subtitle);

  return (
    <div className="h-full min-h-[20rem] rounded-lg overflow-hidden bg-achromatic-lighter dark:bg-achromatic-dark">
      <div className={cn('h-28 relative', avatarElement && 'mb-16')}>
        {imageSrc
          ? <img src={imageSrc} alt="card background" className="object-cover object-center h-full w-full" />
          : <div className="h-full w-full bg-primary-dark dark:bg-primary-light" />}

        {avatarElement && (
          <div className="center rounded-full absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2">
            {avatarElement}
          </div>
        )}

        {optionsTopElement && (
          <span className="absolute top-full right-0 -translate-x-4 translate-y-4">
            {optionsTopElement}
          </span>
        )}
      </div>

      <div className={cn('px-6 pt-4 space-y-10', optionsBottomElement ? 'pb-4' : 'pb-8')}>
        <div className="text-center">
          {titleElement && (
            <p className="text-2xl font-semibold">{titleElement}</p>
          )}
          {subtitleElement && (
            <p className="text-achromatic-dark/50 dark:text-achromatic-lighter/50">
              {subtitleElement}
            </p>
          )}
        </div>

        <div className="space-y-4">
          {listDataCellPairs
            .map(([cellA, cellB]) => (
              <div
                key={`${cellA.id}-${cellB?.id}`}
                className="grid grid-cols-[repeat(auto-fit,minmax(9rem,1fr))] gap-x-10 gap-y-4 text-center"
              >
                <div>
                  <div className="text-xs font-semibold text-achromatic-dark/60 dark:text-achromatic-lighter/50">
                    {flexRenderHeader(headerRow[cellA.column.id])}
                  </div>
                  <div className="text-ellipsis overflow-hidden">
                    {flexRenderCell(cellA)}
                  </div>
                </div>

                {cellB && (
                  <div>
                    <div className="text-xs font-semibold text-achromatic-dark/50 dark:text-achromatic-lighter/50">
                      {flexRenderHeader(headerRow[cellB.column.id])}
                    </div>
                    <div className="text-ellipsis overflow-hidden">
                      {flexRenderCell(cellB)}
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>

        {optionsBottomElement && (
          <div className="w-full">{optionsBottomElement}</div>
        )}
      </div>
    </div>
  );
}

type DataViewGridProps<TData extends ReactTableRowData> = {
  table: ReactTable<TData>;
  mapper?: DataViewCardMainDataMapper;
};

function DataViewGrid<TData extends ReactTableRowData>(
  { table, mapper }: DataViewGridProps<TData>,
) {
  if (!table.getRowModel().rows?.length) {
    return (
      <div>
        <p className="w-full h-24 p-4 center text-sm rounded-lg transition-colors bg-achromatic-lighter hover:bg-achromatic-lighter/50 dark:bg-achromatic-dark dark:hover:bg-achromatic-dark/50">
          No Results.
        </p>
      </div>
    );
  }

  const headerRow: Record<string, ReactTableHeader<TData, unknown>> = keyBy(
    table.getLeafHeaders(),
    (header) => header.id,
  );

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-4">
      {table.getRowModel().rows.map((row) => (
        <DataViewCard key={row.id} dataRow={row} headerRow={headerRow} mapper={mapper} />
      ))}
    </div>
  );
}

type DataViewLayoutProps<TData extends ReactTableRowData> = {
  table: ReactTable<TData>;
  layout: DataViewLayoutType;
  mapper?: DataViewCardMainDataMapper;
};

function DataViewLayout<TData extends ReactTableRowData>(
  { table, layout, mapper }: DataViewLayoutProps<TData>,
) {
  if (layout === 'grid') {
    return <DataViewGrid table={table} mapper={mapper} />;
  }

  return <DataViewTable table={table} />;
}

type DataViewSearchFilterProps = {
  filter: string;
  onChangeFilter: (filter: string) => void;
};

function DataViewSearchFilter({ filter, onChangeFilter }: DataViewSearchFilterProps) {
  const ref = useRef<HTMLInputElement | null>(null);

  function handleClearSearchFilter() {
    onChangeFilter('');
    ref.current?.focus();
  }

  return (
    <Input
      name="search"
      placeholder="Search..."
      value={filter}
      onChange={(event) => onChangeFilter(event.target.value)}
      leftIcon={(
        <span className="text-sm">
          <IoSearchSharp />
        </span>
      )}
      rightIcon={(
        <Button
          variant="ghost"
          size="auto"
          onClick={() => handleClearSearchFilter()}
        >
          <MdOutlineClose />
        </Button>
      )}
      className="max-w-40 py-1.5 border-none"
      ref={ref}
    />
  );
}

type DataViewColumnVisibilityDropdownProps<TData extends ReactTableRowData> = {
  table: ReactTable<TData>;
};

function DataViewColumnVisibilityDropdown<TData extends ReactTableRowData>(
  { table }: DataViewColumnVisibilityDropdownProps<TData>,
) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="auto"
          className="text-2xl"
        >
          <TbColumnRemove />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[150px]">
        <DropdownMenuLabel>Show/Hide Columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) => typeof column.accessorFn !== 'undefined' && column.getCanHide(),
          )
          .map((column) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="capitalize"
              checked={column.getIsVisible()}
              onCheckedChange={(value) => column.toggleVisibility(!!value)}
            >
              {capitalCase(column.id)}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type DataViewSortDropdownProps<TData extends ReactTableRowData> = {
  table: ReactTable<TData>;
};

function DataViewColumnSortDropdown<TData extends ReactTableRowData>(
  { table }: DataViewSortDropdownProps<TData>,
) {
  const columns = table.getAllColumns().filter((column) => column.getCanSort());
  const isAnyColumnSorted = columns.some((column) => (
    column.getIsSorted() === 'desc' || column.getIsSorted() === 'asc'
  ));

  if (!columns.length) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="auto"
          className="text-2xl"
        >
          <BiSortAlt2 />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[150px]">
        <DropdownMenuLabel>Sort Columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {columns.map((column) => (
          <DropdownMenuItem
            key={column.id}
            className="capitalize py-1.5 px-2 flex items-center gap-2"
            onClick={() => column.toggleSorting()}
          >
            <>
              {column.getIsSorted() === 'desc' && <ArrowDownIcon className="h-4 w-4" />}
              {column.getIsSorted() === 'asc' && <ArrowUpIcon className="h-4 w-4" />}
              {(column.getIsSorted() !== 'desc' && column.getIsSorted() !== 'asc') && (
                <span className="h-4 w-4" />
              )}
            </>
            <span>{capitalCase(column.id)}</span>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="capitalize py-1.5 px-2 flex items-center gap-2"
          onClick={() => table.resetSorting()}
        >
          {!isAnyColumnSorted ? <Check className="h-4 w-4 translate-y-[1px]" /> : <div className="h-4 w-4" />}
          Clear
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type DataViewRowsPerPageDropdownProps<TData extends ReactTableRowData> = {
  table: ReactTable<TData>;
};

function DataViewRowsPerPageDropdown<TData extends ReactTableRowData>(
  { table }: DataViewRowsPerPageDropdownProps<TData>,
) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="auto"
          className="text-2xl"
        >
          <CgHashtag />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[150px]">
        <DropdownMenuLabel>Rows Per Page</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <DropdownMenuRadioItem
              key={pageSize}
              value={`${pageSize}`}
            >
              {pageSize}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type DataViewLayoutDropdownProps = {
  layout: DataViewLayoutType;
  onChangeLayout: (layout: DataViewLayoutType) => void;
};

function DataViewLayoutDropdown({ layout, onChangeLayout }: DataViewLayoutDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="auto"
          className="text-xl"
        >
          <FiLayout />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[150px]">
        <DropdownMenuLabel>Select Layout</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={layout}
          onValueChange={(value) => onChangeLayout(value as DataViewLayoutType)}
        >
          {DATA_VIEW_LAYOUTS.map((value) => (
            <DropdownMenuRadioItem
              key={value}
              className="capitalize"
              value={value}
            >
              {capitalCase(value)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function usePersistentDataViewLayout(key: string) {
  return useLocalStorage<DataViewLayoutType>(
    `${key}.dataview.layout`,
    'table',
    {
      deserializer: (value) => {
        const val = JSON.parse(value) as unknown;
        if (val === 'table' || val === 'grid') return val;
        return 'table';
      },
    },
  );
}

type DataViewTopBarProps<TData extends ReactTableRowData> = {
  table: ReactTable<TData>;
  showSortButton?: boolean;
  showVisibilityButton?: boolean;
  showRowsPerPageButton?: boolean;
} & OptionalObjectGroup<{
  layout: DataViewLayoutType;
  onChangeLayout: (layout: DataViewLayoutType) => void;
}> & OptionalObjectGroup<{
  filter: string;
  onChangeFilter: (filter: string) => void;
}>;

function DataViewTopBar<TData extends ReactTableRowData>({
  table,
  showSortButton,
  showVisibilityButton,
  showRowsPerPageButton,
  layout,
  onChangeLayout,
  filter,
  onChangeFilter,
}: DataViewTopBarProps<TData>) {
  return (
    <div>
      <div className="flex justify-between items-center gap-4">
        {
          typeof filter !== 'undefined'
            ? <DataViewSearchFilter filter={filter} onChangeFilter={onChangeFilter} />
            : <div />
        }

        <div className="flex gap-3 items-center">
          {showVisibilityButton && <DataViewColumnVisibilityDropdown table={table} />}
          {showSortButton && <DataViewColumnSortDropdown table={table} />}
          {showRowsPerPageButton && <DataViewRowsPerPageDropdown table={table} />}
          {layout && <DataViewLayoutDropdown layout={layout} onChangeLayout={onChangeLayout} />}
          <Button size="sm" shape="circle" className="text-xl ml-2">+</Button>
        </div>
      </div>
      <Separator className="mt-3" />
    </div>
  );
}

type DataViewPaginationProps<TData extends ReactTableRowData> = {
  table: ReactTable<TData>;
  showSelectedRows?: boolean;
  showPageCount?: boolean;
  showPageButtons?: boolean;
  className?: string;
};

function DataViewPagination<TData extends ReactTableRowData>({
  table,
  showSelectedRows,
  showPageCount,
  showPageButtons,
  className,
}: DataViewPaginationProps<TData>) {
  return (
    <div className={cn('flex items-center justify-between px-2', className)}>
      {showSelectedRows
        ? (
          <div className="flex-1 text-sm">
            {table.getFilteredSelectedRowModel().rows.length}
            {' '}
            of
            {' '}
            {table.getFilteredRowModel().rows.length}
            {' '}
            row(s) selected
          </div>
        )
        : <div />}

      <div className="flex items-center space-x-6 lg:space-x-8">
        {showPageCount && (
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page
            {' '}
            {table.getState().pagination.pageIndex + 1}
            {' '}
            of
            {' '}
            {table.getPageCount()}
          </div>
        )}

        {showPageButtons && (
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <RiArrowLeftDoubleFill className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <FaChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <FaChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <RiArrowRightDoubleFill className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

type DataViewHeaderCheckboxProps<TData extends ReactTableRowData> = {
  table: ReactTable<TData>;
};

function DataViewHeaderCheckbox<TData extends ReactTableRowData>(
  { table }: DataViewHeaderCheckboxProps<TData>,
) {
  return (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected()
        || (table.getIsSomePageRowsSelected() && 'indeterminate')
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
    />
  );
}

type DataViewRowCheckboxProps<TData extends ReactTableRowData> = {
  row: ReactTableRow<TData>;
};

function DataViewRowCheckbox<TData extends ReactTableRowData>(
  { row }: DataViewRowCheckboxProps<TData>,
) {
  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
    />
  );
}

type DataViewHeaderProps<TData extends ReactTableRowData, TValue = unknown> = {
  column: ReactTableColumn<TData, TValue>;
  header: string;
  className?: string;
};

function DataViewHeader<TData extends ReactTableRowData, TValue = unknown>(
  { column, header, className }: DataViewHeaderProps<TData, TValue>,
) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{header}</div>;
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="auto"
          >
            <span>{header}</span>
            {column.getIsSorted() === 'desc' && <ArrowDownIcon className="ml-2 h-4 w-4" />}
            {column.getIsSorted() === 'asc' && <ArrowUpIcon className="ml-2 h-4 w-4" />}
            {(column.getIsSorted() !== 'desc' && column.getIsSorted() !== 'asc') && (
              <CaretSortIcon className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)} className="flex items-center gap-2">
            <ArrowUpIcon className="h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)} className="flex items-center gap-2">
            <ArrowDownIcon className="h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)} className="flex items-center gap-2">
            <EyeNoneIcon className="h-3.5 w-3.5 text-muted-foreground/70" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

const DataViewCheckbox = {
  Header: DataViewHeaderCheckbox,
  Row: DataViewRowCheckbox,
};

export {
  DataViewTable,
  DataViewGrid,
  DataViewLayout,
  DataViewSearchFilter,
  DataViewColumnVisibilityDropdown,
  DataViewColumnSortDropdown,
  DataViewRowsPerPageDropdown,
  DataViewLayoutDropdown,
  usePersistentDataViewLayout,
  DataViewTopBar,
  DataViewPagination,
  DataViewCheckbox,
  DataViewHeader,
};
