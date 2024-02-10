/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import { cn } from '@/utils/cn';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer h-4 w-4 shrink-0 rounded-sm border border-achromatic-dark ring-offset-achromatic-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-achromatic-dark focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-achromatic-dark data-[state=checked]:text-achromatic-light dark:border-achromatic-light dark:ring-offset-achromatic-dark dark:focus-visible:ring-achromatic-light dark:data-[state=checked]:bg-achromatic-light dark:data-[state=checked]:text-achromatic-dark',
      className,
    )}
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

export { Checkbox };
