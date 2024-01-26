import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from 'react';
import { clamp } from '@/utils/clamp';

type MultiStepFormContextValue<
  TFormState extends Record<string, unknown> = Record<string, unknown>,
  TStepTitle extends string = string,
> = {
  stepNumber: number;
  setStep: (step: number | TStepTitle) => void;
  prevStep: () => void;
  nextStep: () => void;
  formState: Partial<TFormState>;
  updateFormState: (state: Partial<TFormState>) => void;
};

type MultiStepFormProps<TStepTitle extends string> = {
  steps: Step<TStepTitle>[];
  startStepNumber?: number;
};

type Step<TStepTitle extends string> = {
  title: TStepTitle;
  component: ReactNode;
};

export function createMultiStepForm<
  TFormState extends Record<string, unknown> = Record<string, unknown>,
  TStepTitle extends string = string,
>() {
  const MultiStepFormContext = createContext<MultiStepFormContextValue<TFormState, TStepTitle>>(
    null as unknown as MultiStepFormContextValue<TFormState, TStepTitle>,
  );

  function useMultiStepForm() {
    const context = useContext(MultiStepFormContext);

    if (context === undefined) {
      throw new Error('No MultiStepForm context provided');
    }

    return context;
  }

  function MultiStepForm(
    { steps, startStepNumber }: MultiStepFormProps<TStepTitle>,
  ) {
    const [formState, setFormState] = useState<Partial<TFormState>>({});
    const [stepNumber, setStepNumber] = useState(startStepNumber ?? 0);

    const setStep = useCallback((step: number | TStepTitle): void => {
      if (typeof step === 'number') {
        setStepNumber(clamp(step, 0, steps.length));
      } else {
        const newStepNumber = steps.findIndex((currentStep) => currentStep.title === step);
        setStepNumber(newStepNumber);
      }
    }, [steps, setStepNumber]);

    const prevStep = useCallback(() => {
      setStepNumber((state) => Math.max(0, state - 1));
    }, [setStepNumber]);

    const nextStep = useCallback(() => {
      setStepNumber((state) => Math.min(steps.length - 1, state + 1));
    }, [steps, setStepNumber]);

    const updateFormState = useCallback((state: Partial<TFormState>) => {
      setFormState((currentState) => ({ ...currentState, ...state }));
    }, [setFormState]);

    const value = useMemo(() => ({
      stepNumber, setStep, prevStep, nextStep, formState, updateFormState,
    }), [stepNumber, setStep, prevStep, nextStep, formState, updateFormState]);

    return (
      <MultiStepFormContext.Provider value={value}>
        {steps[stepNumber].component}
      </MultiStepFormContext.Provider>
    );
  }

  return { useMultiStepForm, MultiStepForm };
}
