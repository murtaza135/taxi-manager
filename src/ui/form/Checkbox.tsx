import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const checkboxVariants = cva(
  'peer h-4 w-4 shrink-0 rounded-sm border ring-offset-achromatic-lighter focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-achromatic-dark focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:text-achromatic-lighter dark:ring-offset-achromatic-dark dark:focus-visible:ring-achromatic-lighter dark:data-[state=checked]:text-achromatic-dark',
  {
    variants: {
      color: {
        achromatic: 'border-achromatic-dark data-[state=checked]:bg-achromatic-dark dark:border-achromatic-lighter dark:data-[state=checked]:bg-achromatic-lighter',
        primary: 'border-primary-dark data-[state=checked]:bg-primary-dark dark:border-primary-light dark:data-[state=checked]:bg-primary-light',
      },
    },
    defaultVariants: {
      color: 'achromatic',
    },
  },
);

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
  & VariantProps<typeof checkboxVariants>
>(({ color, className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(checkboxVariants({ color, className }))}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center text-current')}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox, checkboxVariants };
