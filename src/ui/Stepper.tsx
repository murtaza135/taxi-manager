/* eslint-disable max-len */
import { cn } from '@/utils/cn';

export function StepperItem({ title, step, hideLine, complete }: { title: string, step: number; hideLine?: boolean; complete?: boolean; }) {
  return (
    <li className="flex-1 flex flex-col justify-center items-center text-center gap-2">
      <div className="relative w-full center">
        {!hideLine && <span className={cn('h-[2px] w-full absolute top-1/2 left-1/2', complete && 'bg-primary-dark dark:bg-primary-light', !complete && 'bg-achromatic-light dark:bg-achromatic-dark')} />}
        <span className={cn(' w-9 h-9 rounded-full text-xl font-semibold flex justify-center items-center text-center z-[1]', complete && 'bg-primary-dark dark:bg-primary-light text-achromatic-light dark:text-achromatic-dark', !complete && 'bg-achromatic-light dark:bg-achromatic-dark text-primary-dark dark:text-primary-light')}>
          {step}
        </span>
      </div>
      <p className="text-primary-dark dark:text-primary-light">
        {title}
      </p>
    </li>
  );
}

export function Stepper() {
  return (
    <ol className="flex flex-wrap">
      <StepperItem title="Step 1" step={1} complete />
      <StepperItem title="Step 2" step={2} />
      <StepperItem title="Step 3" step={3} hideLine />
    </ol>
  );
}