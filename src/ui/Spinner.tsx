import { useEffect, useState } from 'react';
import { cn } from '@/utils/cn';

const sizes = {
  sm: 'w-8 h-8 after:w-8 after:h-8',
  default: 'w-12 h-12 after:w-12 after:h-12',
  md: 'w-16 h-16 after:w-16 after:h-16',
  lg: 'w-24 h-24 after:w-24 after:h-24',
} as const;

type SpinnerProps = {
  size?: keyof typeof sizes;
  className?: string;
};

export function Spinner({ size = 'default', className }: SpinnerProps) {
  return (
    <div className="center w-full h-full flex-grow p-2">
      <span className={cn('spinner relative', sizes[size], className)} />
    </div>
  );
}

type DelayedSpinnerProps = SpinnerProps & {
  delay?: number;
};

export function DelayedSpinner({ delay = 1000, ...rest }: DelayedSpinnerProps) {
  const [display, setDisplay] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplay(true);
    }, delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  if (!display) return null;
  return <Spinner {...rest} />;
}
