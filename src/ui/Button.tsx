import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium ring-offset-achromatic-light outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-achromatic-dark focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-achromatic-dark dark:focus-visible:ring-achromatic-light transition-opacity',
  {
    variants: {
      variant: {
        base: 'hover:opacity-75 bg-achromatic-light text-primary-dark dark:bg-primary-light dark:text-achromatic-dark',
        primary: 'hover:opacity-75 bg-primary-dark text-achromatic-light dark:bg-primary-light dark:text-achromatic-dark',
        danger:
          'hover:opacity-75 bg-red-600 text-achromatic-light dark:bg-red-500 dark:text-achromatic-light',
        outline:
          'hover:opacity-50 bg-transparent border border-primary-dark dark:border-primary-light',
        ghost:
          'hover:opacity-50 bg-transparent border-none',
      },
      size: {
        // all sizes are applied in compoundVariants based upon the shape
        sm: '',
        md: '',
        lg: '',
        auto: '',
      },
      shape: {
        block: '',
        circle: 'aspect-square rounded-full',
      },
    },
    compoundVariants: [
      {
        shape: 'block',
        size: 'sm',
        className: 'px-3 py-2 text-xs',
      },
      {
        shape: 'block',
        size: 'md',
        className: 'px-4 py-2 text-sm',
      },
      {
        shape: 'block',
        size: 'lg',
        className: 'px-6 py-2.5 text-base',
      },
      {
        shape: 'circle',
        size: 'sm',
        className: 'h-8 w-8 text-sm',
      },
      {
        shape: 'circle',
        size: 'md',
        className: 'h-10 w-10 text-base',
      },
      {
        shape: 'circle',
        size: 'lg',
        className: 'h-14 w-14 text-lg',
      },
    ],
    defaultVariants: {
      variant: 'base',
      size: 'md',
      shape: 'block',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shape, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, shape, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
