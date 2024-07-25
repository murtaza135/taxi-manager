import { useReactTableContext } from '@/lib/tanstack-table/ReactTable';
import { TableRow, TableCell } from '@/ui/dataview/Table';
import { Skeleton } from '@/ui/Skeleton';
import { Separator } from '@/ui/Separator';

function DataViewTopBarSkeleton() {
  return (
    <div>
      <div className="flex justify-between items-center gap-4 sticky top-0">
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

function DataViewTableRowSkeleton() {
  const table = useReactTableContext();
  const cells = table.getRowModel().rows[1].getVisibleCells();

  return (
    <TableRow>
      {cells.map((cell) => (
        <TableCell key={cell.id} className="w-full p-0">
          <Skeleton className="py-4 px-10 h-12 rounded-none bg-achromatic-light dark:bg-achromatic-darker">
            <Skeleton className="h-full min-w-5 bg-achromatic-lighter dark:bg-achromatic-dark" />
          </Skeleton>
        </TableCell>
      ))}
    </TableRow>
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

export {
  DataViewTopBarSkeleton,
  DataViewTableRowSkeleton,
  DataViewCardSkeleton,
};
