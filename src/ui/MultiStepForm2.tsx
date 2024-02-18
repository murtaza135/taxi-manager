/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';
import { m, AnimatePresence, HTMLMotionProps, Variants, PanInfo } from 'framer-motion';
import { useState } from 'react';
import { LazyMotion } from '@/app/framer-motion/LazyMotion';
import { cn } from '@/utils/cn';
import { clamp } from '@/utils/clamp';
import { Tabs, TabsList, TabsTrigger } from '@/ui/Tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/Select';
import { Separator } from '@/ui/Separator';

type Direction = 'forwards' | 'backwards';
type BaseFormState = Record<string, unknown>;

type MultiStepFormContextValue<
  TFormState extends BaseFormState = BaseFormState,
> = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  direction: Direction;
  setDirection: React.Dispatch<React.SetStateAction<Direction>>;
  formState: Partial<TFormState>;
  updateFormState: (state: Partial<TFormState>) => void;
};

const MultiStepFormContext = React.createContext<MultiStepFormContextValue>(
  null as unknown as MultiStepFormContextValue,
);

function useMultiStepForm<
  TFormState extends BaseFormState = BaseFormState,
>() {
  const context = React.useContext<MultiStepFormContextValue<TFormState>>(
    MultiStepFormContext as unknown as React.Context<MultiStepFormContextValue<TFormState>>,
  );

  if (context === undefined) {
    throw new Error('useMultiStepForm must be used within <MultiStepForm />');
  }

  return context;
}

type MultiStepFormProps = {
  min: number;
  max: number;
  initial?: number;
  className?: string;
  children?: React.ReactNode;
};

function MultiStepForm({ min, max, initial, className, children }: MultiStepFormProps) {
  const [stepValue, setStepValue] = useState(initial ?? min);
  const [direction, setDirection] = useState<Direction>('forwards');
  const [formStateObject, setFormStateObject] = useState<Partial<BaseFormState>>({});

  const setStep = React.useCallback((value: React.SetStateAction<number>) => {
    if (typeof value === 'function') {
      setStepValue((i) => clamp(value(i), min, max));
    } else {
      setStepValue(clamp(value, min, max));
    }
  }, [setStepValue, min, max]);

  const updateFormState = React.useCallback((state: Partial<BaseFormState>) => {
    setFormStateObject((currentState) => ({ ...currentState, ...state }));
  }, [setFormStateObject]);

  const value = React.useMemo(
    () => ({
      step: stepValue,
      setStep,
      direction,
      setDirection,
      formState: formStateObject,
      updateFormState,
    }),
    [stepValue, setStep, direction, setDirection, formStateObject, updateFormState],
  );

  return (
    <MultiStepFormContext.Provider value={value}>
      <div className={cn('relative w-full h-full', className)}>
        {children}
      </div>
    </MultiStepFormContext.Provider>
  );
}

const MultiStepFormContent = React.forwardRef<
  HTMLDivElement,
  // HTMLMotionProps<'div'>
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const temp = 1;

  return (
    <div className={cn('absolute w-full h-full', className)}>
      {children}
    </div>
  );
});
MultiStepFormContent.displayName = 'MultiStepFormContent';

type StepProps = {
  children?: React.ReactNode;
  step: number;
};

function Step({ step, children }: StepProps) {
  const { step: currentStep } = useMultiStepForm();

  return (
    step === currentStep
      ? children
      : null
  );
}

export {
  useMultiStepForm,
  MultiStepForm,
  MultiStepFormContent,
  Step,
};
