import { ReactNode, useRef, useState } from 'react';
import {
  Table as ReactTable,
  Header as ReactTableHeader,
  Row as ReactTableRow,
  RowData as ReactTableRowData,
  Column as ReactTableColumn,
  flexRender,
} from '@tanstack/react-table';
import { IoSearchSharp } from 'react-icons/io5';
import { BiSortDown } from 'react-icons/bi';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { RxMixerHorizontal } from 'react-icons/rx';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { RiArrowLeftDoubleFill, RiArrowRightDoubleFill } from 'react-icons/ri';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
  EyeNoneIcon,
} from '@radix-ui/react-icons';
import { Check } from 'lucide-react';
import { FiLayout } from 'react-icons/fi';
import { MdOutlineClose } from 'react-icons/md';
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
    <div className="rounded-md overflow-auto w-full">
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

type DataViewGridProps<TData extends ReactTableRowData> = {
  table: ReactTable<TData>;
  render: (headers: ReactTableHeader<TData, unknown>[], data: ReactTableRow<TData>) => ReactNode;
};

function DataViewGrid<TData extends ReactTableRowData>(
  { table, render }: DataViewGridProps<TData>,
) {
  if (!table.getRowModel().rows?.length) {
    return (
      <div>
        <p className="w-full h-24 p-4 center text-sm rounded-lg transition-colors bg-achromatic-light hover:bg-achromatic-light/50 dark:bg-achromatic-dark dark:hover:bg-achromatic-dark/50">No Results.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-4">
      {table.getRowModel().rows.map((row) => (
        <div key={row.id}>
          {render(table.getLeafHeaders(), row)}
        </div>
      ))}
    </div>
  );
}

type DataViewLayoutProps<TData extends ReactTableRowData> = {
  table: ReactTable<TData>;
  layout: DataViewLayoutType;
  renderGridCard: (
    headers: ReactTableHeader<TData, unknown>[],
    data: ReactTableRow<TData>
  ) => ReactNode;
};

function DataViewLayout<TData extends ReactTableRowData>(
  { table, layout, renderGridCard }: DataViewLayoutProps<TData>,
) {
  if (layout === 'grid') {
    return <DataViewGrid table={table} render={renderGridCard} />;
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
        className="translate-y-[0px]"
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
              {column.id}
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
            {column.id}
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
              {layoutValue}
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
};
