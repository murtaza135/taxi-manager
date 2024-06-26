import * as React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { cn } from '@/utils/cn';

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = 'horizontal', decorative = true, children, ...props },
    ref,
  ) => (
    <div className="relative">
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn(
          'shrink-0 bg-primary-dark dark:bg-achromatic-dark',
          orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
          className,
        )}
        {...props}
      />
      {children}
    </div>
  ),
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export interface SeparatorTextProps
  extends React.HTMLAttributes<HTMLParagraphElement> { }

// TODO set className for when Seperator orientation is vertical
const SeparatorText = React.forwardRef<HTMLParagraphElement, SeparatorTextProps>(
  ({ className, ...props }, ref) => (
    <p
      className={cn('py-1 px-2 absolute left-1/2 -translate-x-1/2 -translate-y-4 z-[1]', className)}
      ref={ref}
      {...props}
    />
  ),
);
SeparatorText.displayName = 'SeparatorText';

export {
  Separator,
  SeparatorText,
};
