import { cn } from '@/utils/cn';

type SpinnerProps = {
  className?: string;
};

export function Spinner({ className }: SpinnerProps) {
  return (
    <div className="center w-full h-full flex-grow p-2">
      <span className={cn('spinner relative w-12 h-12 after:w-12 after:h-12', className)} />
    </div>
  );
}
