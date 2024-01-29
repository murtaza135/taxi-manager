import { cn } from '@/utils/cn';

type StepperItemProps<TStepTitle extends string = string> = {
  step: number;
  title?: TStepTitle,
  complete?: boolean;
  hideLine?: boolean;
};

function StepperItem({ step, title, complete, hideLine }: StepperItemProps) {
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

type StepperProps<TStepTitle extends string = string> = {
  steps: TStepTitle[];
  currentStep: number;
};

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <ol className="flex flex-wrap">
      {steps.map((step, index) => (
        <StepperItem
          key={step}
          title={step}
          step={index + 1}
          complete={index < currentStep}
          hideLine={index === steps.length - 1}
        />
      ))}
    </ol>
  );
}
