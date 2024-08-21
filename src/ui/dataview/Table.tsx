import * as React from 'react';
import { cn } from '@/utils/cn';

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className={cn('relative w-full bg-achromatic-lighter dark:bg-achromatic-dark scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-achromatic-lighter scrollbar-thumb-primary-dark dark:scrollbar-track-achromatic-dark dark:scrollbar-thumb-achromatic-500', className)}>
    <table
      ref={ref}
      className="w-full caption-bottom text-sm"
      {...props}
    />
  </div>
));
Table.displayName = 'Table';

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn('[&_tr]:border-b-2 [&_tr]:border-achromatic-light dark:[&_tr]:border-achromatic-darker', className)} {...props} />
));
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn('[&_tr]:border-b-2 [&_tr:last-child]:border-0 [&_tr]:border-achromatic-light dark:[&_tr]:border-achromatic-darker', className)}
    {...props}
  />
));
TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      'border-t bg-primary-light/50 font-medium [&>tr]:last:border-b-0 dark:bg-primary-dark/50',
      className,
    )}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'border-b transition-colors data-[state=false]:hover:bg-achromatic-light/50 data-[state=selected]:text-achromatic-lighter data-[state=selected]:bg-primary-dark dark:data-[state=false]:hover:bg-achromatic-darker/50 dark:data-[state=selected]:text-achromatic-dark dark:data-[state=selected]:bg-primary-light',
      className,
    )}
    {...props}
  />
));
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'h-12 pt-1 px-10 text-left align-middle font-semibold text-achromatic-dark/70 [&:has([role=checkbox])]:translate-y-0.5 dark:text-achromatic-400/80 text-nowrap',
      className,
    )}
    {...props}
  />
));
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn('py-4 px-10 align-middle [&:has([role=checkbox])]:translate-y-0.5', className)}
    {...props}
  />
));
TableCell.displayName = 'TableCell';

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('mt-4 text-sm text-achromatic-500 dark:text-achromatic-400', className)}
    {...props}
  />
));
TableCaption.displayName = 'TableCaption';

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
