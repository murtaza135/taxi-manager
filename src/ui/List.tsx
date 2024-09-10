import * as React from 'react';
import { cn } from '@/utils/cn';

const List = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col gap-2', className)}
    {...props}
  >
    {children}
  </div>
));
List.displayName = 'List';

const ListItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('bg-achromatic-lighter text-achromatic-dark border-primary-dark dark:bg-achromatic-dark dark:text-achromatic-lighter dark:border-achromatic-darker border rounded-lg p-2 xs:p-4', className)}
    {...props}
  >
    {children}
  </div>
));
ListItem.displayName = 'ListItem';

export { List, ListItem };
