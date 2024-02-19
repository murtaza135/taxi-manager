import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/utils/cn';

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'w-full px-2 inline-flex items-center justify-start gap-3 flex-wrap border-b border-primary-light dark:border-achromatic-dark',
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center whitespace-nowrap px-2 pt-2 pb-1 text-sm font-medium ring-offset-achromatic-light transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-achromatic-dark focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50 rounded-t-lg border-t-2 border-b border-x border-transparent data-[state=active]:border-primary-dark dark:ring-offset-achromatic-dark dark:focus-visible:ring-achromatic-300 dark:data-[state=active]:border-t-primary-light dark:data-[state=active]:border-b-scene-dark dark:data-[state=active]:border-x-achromatic-dark translate-y-[1px]', // dark:data-[state=active]:border-primary-light
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-2 ring-offset-achromatic-light focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-achromatic-dark focus-visible:ring-offset-0 dark:ring-offset-achromatic-dark dark:focus-visible:ring-achromatic-300',
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
