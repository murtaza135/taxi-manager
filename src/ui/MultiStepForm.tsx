import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from 'react';

type MultiStepFormContextValue<
  TFormState extends Record<string, unknown> = Record<string, unknown>,
  TStepTitle extends string = string,
> = {
  stepNumber: number;
  setStepNumber: (stepNumber: number) => void;
  nextStep: () => void;
  setStep: (stepTitle: TStepTitle) => void;
  formState: Partial<TFormState>;
  updateFormState: (formState: Partial<TFormState>) => void;
  submitForm: () => void | Promise<void>;
};

type MultiStepFormProps<TFormState extends Record<string, unknown>, TStepTitle extends string> = {
  steps: Step<TStepTitle>[];
  startStepNumber?: number;
  onSubmit?: (data: Partial<TFormState>) => void | Promise<void>;
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
    { steps, startStepNumber, onSubmit }: MultiStepFormProps<TFormState, TStepTitle>,
  ) {
    const [formState, setFormState] = useState<Partial<TFormState>>({});
    const [stepNumber, setStepNumber] = useState(startStepNumber ?? 0);

    // TODO previousStep

    const nextStep = useCallback(() => {
      // TODO clamp beteen 0 and max
      setStepNumber((state) => state + 1);
    }, [setStepNumber]);

    const setStep = useCallback((title: TStepTitle) => {
      const newStepNumber = steps.findIndex((step) => step.title === title);
      setStepNumber(newStepNumber);
    }, [steps, setStepNumber]);

    const updateFormState = useCallback((updatedFormState: Partial<TFormState>) => {
      setFormState((state) => ({ ...state, ...updatedFormState }));
    }, [setFormState]);

    const submitForm = useCallback(async () => {
      await onSubmit?.(formState);
    }, [formState, onSubmit]);

    const value = useMemo(() => ({
      stepNumber, setStepNumber, nextStep, setStep, formState, updateFormState, submitForm,
    }), [stepNumber, setStepNumber, nextStep, setStep, formState, updateFormState, submitForm]);

    return (
      <MultiStepFormContext.Provider value={value}>
        {steps[stepNumber].component}
      </MultiStepFormContext.Provider>
    );
  }

  return { useMultiStepForm, MultiStepForm };
}
