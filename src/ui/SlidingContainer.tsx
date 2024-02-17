/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';
import { m } from 'framer-motion';
import { LazyMotion } from '@/app/framer-motion/LazyMotion';
import { cn } from '@/utils/cn';

// TODO add orientation

const SlidingContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const temp = 1;

  return (
    <div
      ref={ref}
      className={cn('border-2 border-red-500', className)}
      {...props}
    />
  );
});
SlidingContainer.displayName = 'SlidingContainer';

export { SlidingContainer };
