import { useState } from 'react';
import { Form1 } from '@/features/tempForm/components/Form1';
import { Form2 } from '@/features/tempForm/components/Form2';
import { Form3 } from '@/features/tempForm/components/Form3';
import { MultiStepForm, MultiStepFormContent, Step, MultiStepFormStepper, MultiStepFormStepperItem } from '@/ui/MultiStepForm2';
import { FormSchemaType } from '@/features/tempForm/schema';

export function NewForm() {
  const [formState, setFormState] = useState<FormSchemaType>({
    username1: '',
    username2: '',
    username3: '',
  });

  return (
    <MultiStepForm min={1} max={3}>
      <MultiStepFormStepper>
        <MultiStepFormStepperItem step={1} title="Form 1" />
        <MultiStepFormStepperItem step={2} title="Form 2" />
        <MultiStepFormStepperItem step={3} title="Form 3" />
      </MultiStepFormStepper>

      <MultiStepFormContent className="flex justify-center items-start">
        <Step step={1}><Form1 /></Step>
        <Step step={2}><Form2 /></Step>
        <Step step={3}><Form3 /></Step>
      </MultiStepFormContent>
    </MultiStepForm>
  );
}
