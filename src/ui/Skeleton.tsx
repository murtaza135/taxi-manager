import { cn } from '@/utils/cn';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-lg bg-achromatic-lighter dark:bg-achromatic-dark', className)}
      {...props}
    />
  );
}

export { Skeleton };
