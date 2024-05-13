import * as React from 'react';
import { m, AnimatePresence, HTMLMotionProps, Variants } from 'framer-motion';
import { LazyMotion } from '@/utils/framer-motion/LazyMotion';
import { cn } from '@/utils/cn';
import { clamp } from '@/utils/clamp';

type Direction = 'forwards' | 'backwards';
type BaseFormState = Record<string, unknown>;

type MultiStepFormContextValue<TFormState extends BaseFormState = BaseFormState> = {
  step: number;
  direction: Direction;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  nextStep: (value?: number) => void;
  prevStep: (value?: number) => void;
  min: number;
  max: number;
  formState: Partial<TFormState>;
  updateFormState: (state: Partial<TFormState>) => void;
};

const MultiStepFormContext = React.createContext<MultiStepFormContextValue>(
  null as unknown as MultiStepFormContextValue,
);

function useMultiStepFormContext<TFormState extends BaseFormState = BaseFormState>() {
  const context = React.useContext<MultiStepFormContextValue<TFormState>>(
    MultiStepFormContext as unknown as React.Context<MultiStepFormContextValue<TFormState>>,
  );

  if (context === undefined) {
    throw new Error('useMultiStepFormContext must be used within <MultiStepForm />');
  }

  return context;
}

type MultiStepFormProps = {
  min: number;
  max: number;
  initial?: number;
  step?: number;
  onStepChange?: (index: number) => void;
  className?: string;
  children?: React.ReactNode;
};

function MultiStepForm(
  { min, max, initial, step, onStepChange, className, children }: MultiStepFormProps,
) {
  const [internalStep, setInternalStep] = React.useState(step ?? initial ?? min);
  const [direction, setDirection] = React.useState<Direction>('forwards');
  const [formStateObject, setFormStateObject] = React.useState<Partial<BaseFormState>>({});

  const setStep = React.useCallback((value: React.SetStateAction<number>) => {
    const newStepValue = clamp(typeof value === 'function' ? value(internalStep) : value, min, max);
    setInternalStep(newStepValue);
    setDirection(newStepValue >= internalStep ? 'forwards' : 'backwards');
    onStepChange?.(newStepValue);
  }, [internalStep, setInternalStep, setDirection, onStepChange, min, max]);

  const nextStep = React.useCallback((value?: number) => {
    setStep((i) => i + (value ?? 1));
  }, [setStep]);

  const prevStep = React.useCallback((value?: number) => {
    setStep((i) => i - (value ?? 1));
  }, [setStep]);

  const updateFormState = React.useCallback((state: Partial<BaseFormState>) => {
    setFormStateObject((currentState) => ({ ...currentState, ...state }));
  }, [setFormStateObject]);

  const value = React.useMemo(
    () => ({
      step: step !== undefined ? step : internalStep,
      direction,
      setStep,
      nextStep,
      prevStep,
      min,
      max,
      formState: formStateObject,
      updateFormState,
    }),
    [
      step,
      internalStep,
      direction,
      setStep,
      nextStep,
      prevStep,
      min,
      max,
      formStateObject,
      updateFormState,
    ],
  );

  return (
    <MultiStepFormContext.Provider value={value}>
      <div className={cn('', className)}>
        {children}
      </div>
    </MultiStepFormContext.Provider>
  );
}

const variants: Variants = {
  enter: (direction: Direction) => ({
    x: direction === 'forwards' ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: Direction) => ({
    zIndex: 0,
    x: direction === 'backwards' ? 1000 : -1000,
    opacity: 0,
    transition: {
      opacity: { duration: 0 },
    },
  }),
};

const MultiStepFormItems = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<'div'>
>(({ className, children, ...props }, ref) => {
  const { step, direction } = useMultiStepFormContext();

  return (
    <LazyMotion>
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <m.div
          key={step}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            y: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
          }}
          className={cn('', className)}
          ref={ref}
          {...props}
        >
          {children}
        </m.div>
      </AnimatePresence>
    </LazyMotion>
  );
});
MultiStepFormItems.displayName = 'MultiStepFormItems';

type MultiStepFormItemProps = {
  children?: React.ReactNode;
  step: number;
};

function MultiStepFormItem({ step, children }: MultiStepFormItemProps) {
  const { step: currentStep } = useMultiStepFormContext();

  return (
    step === currentStep
      ? children
      : null
  );
}

const MultiStepFormStepper = React.forwardRef<
  HTMLOListElement,
  React.HTMLAttributes<HTMLOListElement>
>(({ className, children, ...props }, ref) => {
  const temp = 1;

  return (
    <ol
      ref={ref}
      className={cn('flex flex-wrap mb-12', className)}
      {...props}
    >
      {children}
    </ol>
  );
});
MultiStepFormStepper.displayName = 'MultiStepFormStepper';

type MultiStepFormStepperItemProps = {
  step: number;
  title?: string;
};

const MultiStepFormStepperItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement> & MultiStepFormStepperItemProps
>(({ step, title, className, ...props }, ref) => {
  const { step: currentStep, max } = useMultiStepFormContext();
  const hideLine = step === max;
  const complete = step < currentStep;

  return (
    <li
      ref={ref}
      className={cn('flex-1 flex flex-col justify-center items-center text-center gap-2', className)}
      {...props}
    >
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
});
MultiStepFormStepperItem.displayName = 'MultiStepFormStepperItem';

export {
  useMultiStepFormContext,
  MultiStepForm,
  MultiStepFormItems,
  MultiStepFormItem,
  MultiStepFormStepper,
  MultiStepFormStepperItem,
};
