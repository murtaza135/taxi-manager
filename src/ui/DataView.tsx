import { useRef, useState } from 'react';
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
import { BiSortDown } from 'react-icons/bi';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { RxMixerHorizontal } from 'react-icons/rx';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { RiArrowLeftDoubleFill, RiArrowRightDoubleFill } from 'react-icons/ri';
import { ArrowDownIcon, ArrowUpIcon, CaretSortIcon, EyeNoneIcon } from '@radix-ui/react-icons';
import { Check } from 'lucide-react';
import { FiLayout } from 'react-icons/fi';
import { MdOutlineClose } from 'react-icons/md';
import { TiEye } from 'react-icons/ti';
import chunk from 'lodash/chunk';
import partition from 'lodash/partition';
import keyBy from 'lodash/keyBy';
import mapValues from 'lodash/mapValues';
import { capitalCase } from 'change-case';
import { Link } from 'wouter';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/Select';
import { Checkbox } from '@/ui/Checkbox';
import { Avatar, AvatarImage } from '@/ui/Avatar';
import { cn } from '@/utils/cn';
import { OptionalGroup } from '@/types/utils';

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
  options?: string;
};

type DataViewCardProps<TData extends ReactTableRowData> = {
  headers: Record<string, ReactTableHeader<TData, unknown>>;
  row: ReactTableRow<TData>;
  mapper?: DataViewCardMainDataMapper;
};

function DataViewCard<TData extends ReactTableRowData>(
  { headers, row, mapper = {} }: DataViewCardProps<TData>,
) {
  // TODO comment on whats going on here
  // TODO change cell.renderValue() to row.getValue("<id>")?
  const mapperValues = Object.values(mapper);
  const [mainDataCells, listDataCells] = partition(
    row.getVisibleCells(),
    (cell) => mapperValues.includes(cell.column.id),
  );
  const mainDataCellsObject = keyBy(mainDataCells, (cell) => cell.column.id);
  const mainDataCellsMap = mapValues(
    mapper,
    (value) => (value ? mainDataCellsObject[value] : undefined),
  );
  const listDataCellPairs = chunk(listDataCells, 2) as DataViewCardCellPair<TData>[];

  const imageRenderValue = mainDataCellsMap.image?.renderValue<string>();
  const avatarRenderValue = mainDataCellsMap.avatar?.renderValue<string>();

  return (
    <div className="h-full min-h-[20rem] rounded-lg overflow-hidden transition-colors bg-achromatic-light hover:bg-achromatic-light/35 dark:bg-achromatic-dark dark:hover:bg-achromatic-dark/35">
      <div className={cn('h-28 relative', !!avatarRenderValue && 'mb-16')}>
        {imageRenderValue
          ? <img src={imageRenderValue} alt="card background" className="object-cover object-center h-full w-full" />
          : <div className="h-full w-full bg-primary-dark dark:bg-primary-light" />}

        {!!avatarRenderValue
          && (
            <Avatar className="h-32 w-32 rounded-full absolute top-full left-1/2 -translate-x-16 -translate-y-16">
              <AvatarImage src={avatarRenderValue} alt="avatar" />
            </Avatar>
          )}

        {!!mainDataCellsMap.options && (
          <span className="absolute top-full right-0 -translate-x-4 translate-y-4">
            {flexRender(
              mainDataCellsMap.options.column.columnDef.cell,
              mainDataCellsMap.options.getContext(),
            )}
          </span>
        )}
      </div>

      <div className="px-6 pb-8 pt-4 space-y-10">
        <div className="text-center">
          {!!mainDataCellsMap.title && <p className="text-2xl font-semibold">{mainDataCellsMap.title.renderValue<string>()}</p>}
          {!!mainDataCellsMap.subtitle && <p className="text-achromatic-dark/50 dark:text-achromatic-light/50">{mainDataCellsMap.subtitle.renderValue<string>()}</p>}
        </div>

        <div className="space-y-4">
          {listDataCellPairs
            .map(([cellA, cellB]) => (
              <div
                key={`${cellA.id}-${cellB?.id}`}
                className="grid grid-cols-[repeat(auto-fit,minmax(9rem,1fr))] gap-x-10 gap-y-4 text-center"
              >
                <div>
                  <div className="text-xs font-semibold text-achromatic-dark/50 dark:text-achromatic-light/50">
                    {flexRender(
                      headers[cellA.column.id].column.columnDef.header,
                      headers[cellA.column.id].getContext(),
                    )}
                  </div>
                  <div className="text-ellipsis overflow-hidden">
                    {flexRender(cellA.column.columnDef.cell, cellA.getContext())}
                  </div>
                </div>

                {cellB && (
                  <div>
                    <div className="text-xs font-semibold text-achromatic-dark/50 dark:text-achromatic-light/50">
                      {flexRender(
                        headers[cellB.column.id].column.columnDef.header,
                        headers[cellB.column.id].getContext(),
                      )}
                    </div>
                    <div className="text-ellipsis overflow-hidden">
                      {flexRender(cellB.column.columnDef.cell, cellB.getContext())}
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
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
        <p className="w-full h-24 p-4 center text-sm rounded-lg transition-colors bg-achromatic-light hover:bg-achromatic-light/50 dark:bg-achromatic-dark dark:hover:bg-achromatic-dark/50">
          No Results.
        </p>
      </div>
    );
  }

  const headers: Record<string, ReactTableHeader<TData, unknown>> = keyBy(
    table.getLeafHeaders(),
    (header) => header.id,
  );

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-4">
      {table.getRowModel().rows.map((row) => (
        <DataViewCard key={row.id} row={row} headers={headers} mapper={mapper} />
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
    <div className="flex gap-2 py-1.5 px-3 rounded-lg bg-achromatic-light dark:bg-achromatic-dark">
      <Input
        name="search"
        placeholder="Search..."
        value={filter}
        onChange={(event) => onChangeFilter(event.target.value)}
        icon={<IoSearchSharp />}
        className="min-w-8 max-w-36 p-0 border-none rounded-none bg-transparent dark:bg-transparent"
        ref={ref}
      />
      <Button
        variant="ghost"
        size="auto"
        onClick={() => handleClearSearchFilter()}
      >
        <MdOutlineClose />
      </Button>
    </div>
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
          className="text-xl translate-y-[1px]"
        >
          <RxMixerHorizontal />
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
  const areAllColumnsNotSorted = columns.every((column) => (
    column.getIsSorted() !== 'desc' && column.getIsSorted() !== 'asc'
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
          className="text-2xl translate-y-[1px]"
        >
          <BiSortDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[150px]">
        <DropdownMenuLabel>Sort Columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {columns.map((column) => (
          <DropdownMenuItem
            key={column.id}
            className="capitalize py-1.5 px-2 flex gap-2"
            onClick={() => column.toggleSorting()}
          >
            {column.getIsSorted() === 'desc' && <ArrowDownIcon className="h-4 w-4" />}
            {column.getIsSorted() === 'asc' && <ArrowUpIcon className="h-4 w-4" />}
            {(column.getIsSorted() !== 'desc' && column.getIsSorted() !== 'asc') && (
              <span className="h-4 w-4" />
            )}
            {capitalCase(column.id)}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="capitalize py-1.5 px-2 flex gap-2"
          onClick={() => table.resetSorting()}
        >
          {areAllColumnsNotSorted ? <Check className="h-4 w-4" /> : <div className="h-4 w-4" />}
          Clear
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type DataViewLayoutDropdownProps = {
  layout: DataViewLayoutType;
  onChangeLayout: (layout: DataViewLayoutType) => void;
};

function DataViewLayoutDropdown({ layout, onChangeLayout }: DataViewLayoutDropdownProps) {
  const [position, setPosition] = useState<DataViewLayoutType>(layout);

  function handleValueChange(value: DataViewLayoutType) {
    setPosition(value);
    onChangeLayout(value);
  }

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
          value={position}
          onValueChange={(value) => handleValueChange(value as DataViewLayoutType)}
        >
          {DATA_VIEW_LAYOUTS.map((layoutValue) => (
            <DropdownMenuRadioItem
              key={layoutValue}
              className="capitalize"
              value={layoutValue}
            >
              {capitalCase(layoutValue)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type DataViewTopBarProps<TData extends ReactTableRowData> = {
  table: ReactTable<TData>;
  showSortButton?: boolean;
  showVisibilityButton?: boolean;
} & OptionalGroup<{
  layout: DataViewLayoutType;
  onChangeLayout: (layout: DataViewLayoutType) => void;
}> & OptionalGroup<{
  filter: string;
  onChangeFilter: (filter: string) => void;
}>;

function DataViewTopBar<TData extends ReactTableRowData>({
  table,
  showSortButton,
  showVisibilityButton,
  layout,
  onChangeLayout,
  filter,
  onChangeFilter,
}: DataViewTopBarProps<TData>) {
  return (
    <div className="flex justify-between items-center gap-4">
      {
        typeof filter !== 'undefined'
          ? <DataViewSearchFilter filter={filter} onChangeFilter={onChangeFilter} />
          : <div />
      }

      <div className="flex gap-3 items-center">
        {showVisibilityButton && <DataViewColumnVisibilityDropdown table={table} />}
        {showSortButton && <DataViewColumnSortDropdown table={table} />}
        {layout && <DataViewLayoutDropdown layout={layout} onChangeLayout={onChangeLayout} />}
        <Button size="sm" shape="circle" className="text-xl ml-2">+</Button>
      </div>
    </div>
  );
}

type DataViewPaginationProps<TData extends ReactTableRowData> = {
  table: ReactTable<TData>;
};

function DataViewPagination<TData extends ReactTableRowData>(
  { table }: DataViewPaginationProps<TData>,
) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm">
        {table.getFilteredSelectedRowModel().rows.length}
        {' '}
        of
        {' '}
        {table.getFilteredRowModel().rows.length}
        {' '}
        row(s) selected.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page
          {' '}
          {table.getState().pagination.pageIndex + 1}
          {' '}
          of
          {' '}
          {table.getPageCount()}
        </div>
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
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeNoneIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

type DataViewOpenPageProps = {
  href: string;
  className?: string;
};

function DataViewOpenPage(
  { href, className }: DataViewOpenPageProps,
) {
  return (
    <Link href={href}>
      <Button
        variant="ghost"
        size="auto"
        className={cn('text-2xl text-primary-dark dark:text-achromatic-500', className)}
      >
        <TiEye />
      </Button>
    </Link>
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
  DataViewLayoutDropdown,
  DataViewTopBar,
  DataViewPagination,
  DataViewCheckbox,
  DataViewHeader,
  DataViewOpenPage,
};
