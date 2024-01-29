import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useTransition, animated } from '@react-spring/web';
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
  bounce?: boolean;
  render?: (form: ReactNode) => ReactNode;
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
    { steps, startStepNumber, bounce, render }: MultiStepFormProps<TStepTitle>,
  ) {
    const [formState, setFormState] = useState<Partial<TFormState>>({});
    const [stepNumber, setStepNumber] = useState(startStepNumber ?? 0);
    const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

    const transitions = useTransition(stepNumber, {
      from: direction === 'forward'
        ? { opacity: 0, transform: 'translate3d(100%,0,0)' }
        : { opacity: 0, transform: 'translate3d(-100%,0,0)' },
      enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
      leave: direction === 'forward'
        ? { opacity: 0, transform: 'translate3d(-50%,0,0)' }
        : { opacity: 0, transform: 'translate3d(50%,0,0)' },
      exitBeforeEnter: true,
      config: bounce ? { tension: 100, friction: 12, mass: 1 } : {},
    });

    const setStep = useCallback((step: number | TStepTitle): void => {
      if (typeof step === 'number') {
        if (step < stepNumber) {
          setDirection('backward');
        } else {
          setDirection('forward');
        }
        setStepNumber(clamp(step, 0, steps.length));
      } else {
        const newStepNumber = steps.findIndex((currentStep) => currentStep.title === step);
        if (newStepNumber < stepNumber) {
          setDirection('backward');
        } else {
          setDirection('forward');
        }
        setStepNumber(newStepNumber);
      }
    }, [steps, stepNumber, setStepNumber]);

    const prevStep = useCallback(() => {
      setDirection('backward');
      setStepNumber((state) => Math.max(0, state - 1));
    }, [setDirection, setStepNumber]);

    const nextStep = useCallback(() => {
      setDirection('forward');
      setStepNumber((state) => Math.min(steps.length - 1, state + 1));
    }, [steps, setDirection, setStepNumber]);

    const updateFormState = useCallback((state: Partial<TFormState>) => {
      setFormState((currentState) => ({ ...currentState, ...state }));
    }, [setFormState]);

    const value = useMemo(() => ({
      stepNumber, setStep, prevStep, nextStep, formState, updateFormState,
    }), [stepNumber, setStep, prevStep, nextStep, formState, updateFormState]);

    const transitionElement = transitions((style, stepNumberProp) => (
      <animated.div style={style} className="center">
        {steps[stepNumberProp].component}
      </animated.div>
    ));

    return (
      <MultiStepFormContext.Provider value={value}>
        {render ? render(transitionElement) : transitionElement}
      </MultiStepFormContext.Provider>
    );
  }

  return { useMultiStepForm, MultiStepForm };
}
