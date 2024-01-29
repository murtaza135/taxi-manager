import { ReactNode } from 'react';
import { cn } from '@/utils/cn';

type StepperProps = {
  children?: ReactNode;
};

export function Stepper({ children }: StepperProps) {
  return (
    <ol className="flex flex-wrap">
      {children}
    </ol>
  );
}

type StepperItemProps = {
  step: number;
  title?: string,
  complete?: boolean;
  hideLine?: boolean;
};

export function StepperItem({ step, title, complete, hideLine }: StepperItemProps) {
  return (
    <li className="flex-1 flex flex-col justify-center items-center text-center gap-2">
      <div className="relative w-full center">
        {!hideLine && (
          <span
            className={cn(
              'h-[3px] -translate-y-[1.5px] w-full absolute top-1/2 left-1/2',
              complete && 'bg-primary-dark dark:bg-primary-light',
              !complete && 'bg-achromatic-light dark:bg-achromatic-dark',
            )}
          />
        )}

        <span
          className={cn(
            'w-9 h-9 rounded-full text-xl font-semibold flex justify-center items-center text-center z-[1]',
            complete && 'bg-primary-dark dark:bg-primary-light text-achromatic-light dark:text-achromatic-dark',
            !complete && 'bg-achromatic-light dark:bg-achromatic-dark text-primary-dark dark:text-primary-light',
          )}
        >
          {step}
        </span>
      </div>

      {!!title && <p className="text-primary-dark dark:text-primary-light">{title}</p>}
    </li>
  );
}
