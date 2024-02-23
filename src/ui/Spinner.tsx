import { cn } from '@/utils/cn';

type SpinnerProps = {
  className?: string;
};

export function Spinner({ className }: SpinnerProps) {
  return (
    <div className="center w-full h-full flex-grow">
      <span className={cn('spinner relative', className)} />
    </div>
  );
}
