import { cn } from '@/utils/cn';

type SpinnerProps = {
  className?: string;
};

export function Spinner({ className }: SpinnerProps) {
  return (
    <span className={cn('spinner relative', className)} />
  );
}
