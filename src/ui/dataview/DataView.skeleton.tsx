import { ReactNode } from 'react';
import { useReactTableContext } from '@/lib/tanstack-table/ReactTable';
import { Table, TableBody, TableRow, TableCell } from '@/ui/dataview/Table';
import { Skeleton } from '@/ui/Skeleton';
import { Separator } from '@/ui/Separator';
import { cn } from '@/utils/cn';
import { range } from '@/utils/array/range';

type DataViewContainerSkeletonProps = {
  className?: string;
  children?: ReactNode;
};

function DataViewContainerSkeleton({ children, className }: DataViewContainerSkeletonProps) {
  return (
    <div className={cn('flex flex-col gap-3 h-[calc(100dvh-5rem)] pb-5 pwa:pb-[4.25rem]', className)}>
      {children}
    </div>
  );
}

function DataViewTopBarSkeleton() {
  return (
    <div>
      <div className="flex justify-between items-center gap-4 sticky top-0 flex-wrap-reverse">
        <div className="flex gap-3 items-center">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-6 w-6" />
          <Skeleton className="h-6 w-6" />
          <Skeleton className="h-6 w-6" />
          <Skeleton className="h-6 w-6" />
        </div>
        <Skeleton className="h-5 w-full max-w-32" />
      </div>
      <Separator className="mt-2" />
    </div>
  );
}

const tableCellSizes = {
  xs: 'min-w-4',
  sm: 'min-w-10',
  md: 'min-w-16',
  lg: 'min-w-24',
  xl: 'min-w-32',
} as const;

type DataViewTableCellSkeletonProps = {
  minSize?: keyof typeof tableCellSizes;
};

function DataViewTableCellSkeleton({ minSize = 'md' }: DataViewTableCellSkeletonProps) {
  return (
    <TableCell className="w-fit p-0">
      <div className="py-4 px-10 h-12 rounded-none bg-achromatic-lighter dark:bg-achromatic-dark">
        <Skeleton className={cn('h-full bg-achromatic-light dark:bg-achromatic-darker', tableCellSizes[minSize])} />
      </div>
    </TableCell>
  );
}

function DataViewTableRowSkeleton() {
  const table = useReactTableContext();
  const cells = table.getRowModel().rows[1].getVisibleCells();

  return (
    <TableRow>
      {cells.map((cell) => (
        <DataViewTableCellSkeleton key={cell.id} minSize="xs" />
      ))}
    </TableRow>
  );
}

function DataViewTableSkeleton() {
  return (
    <div className="w-full grid rounded-md overflow-hidden">
      <Table>
        <TableBody>
          {range(16).map((rowIndex) => (
            <TableRow key={rowIndex}>
              <DataViewTableCellSkeleton minSize="xs" />
              <DataViewTableCellSkeleton minSize="lg" />
              <DataViewTableCellSkeleton minSize="sm" />
              <DataViewTableCellSkeleton minSize="md" />
              <DataViewTableCellSkeleton minSize="lg" />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function DataViewCardSkeleton() {
  return (
    <Skeleton className="min-h-[20rem] h-full w-full flex flex-col gap-10 justify-start items-center rounded-lg overflow-hidden">
      <div className="h-28 relative mb-10">
        <Skeleton className="h-32 w-32 center rounded-full absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 bg-achromatic-light dark:bg-achromatic-darker" />
      </div>
      <Skeleton className="h-8 max-w-48 w-full bg-achromatic-light dark:bg-achromatic-darker" />
      <div className="px-6 pb-8 w-full h-fit flex flex-col items-center gap-4">
        <Skeleton className="h-4 max-w-32 w-full bg-achromatic-light dark:bg-achromatic-darker" />
        <Skeleton className="h-4 max-w-48 w-full bg-achromatic-light dark:bg-achromatic-darker" />
        <Skeleton className="h-4 max-w-24 w-full bg-achromatic-light dark:bg-achromatic-darker" />
        <Skeleton className="h-4 max-w-32 w-full bg-achromatic-light dark:bg-achromatic-darker" />
        <Skeleton className="h-4 max-w-20 w-full bg-achromatic-light dark:bg-achromatic-darker" />
        <Skeleton className="h-4 max-w-40 w-full bg-achromatic-light dark:bg-achromatic-darker" />
        <Skeleton className="h-4 max-w-28 w-full bg-achromatic-light dark:bg-achromatic-darker" />
        <Skeleton className="h-4 max-w-48 w-full bg-achromatic-light dark:bg-achromatic-darker" />
      </div>
    </Skeleton>
  );
}

function DataViewGridSkeleton() {
  return (
    <div className="flex gap-4 h-full overflow-hidden">
      <div className="w-full h-fit grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-4">
        {range(4).map((index) => (
          <DataViewCardSkeleton key={index} />
        ))}
      </div>
      <div className="h-full w-2 rounded-md bg-achromatic-lighter dark:bg-achromatic-dark" />
    </div>
  );
}

export {
  DataViewContainerSkeleton,
  DataViewTopBarSkeleton,
  DataViewTableCellSkeleton,
  DataViewTableRowSkeleton,
  DataViewTableSkeleton,
  DataViewCardSkeleton,
  DataViewGridSkeleton,
};
