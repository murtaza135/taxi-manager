import * as React from 'react';
import { cn } from '@/utils/cn';

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn('bg-achromatic-lighter dark:bg-achromatic-dark text-primary-dark dark:text-primary-light px-7 py-6 rounded-lg', className)}
    ref={ref}
    {...props}
  />
));
Card.displayName = 'Card';

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h2
    className={cn('text-center text-2xl font-semibold', className)}
    ref={ref}
    {...props}
  >
    {children}
  </h2>
));
CardTitle.displayName = 'CardTitle';

export {
  Card,
  CardTitle,
};
