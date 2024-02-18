import { Form1 } from '@/features/tempForm/components/Form1';
import { Form2 } from '@/features/tempForm/components/Form2';
import { Form3 } from '@/features/tempForm/components/Form3';
import { MultiStepForm, MultiStepFormItems, MultiStepFormItem, MultiStepFormStepper, MultiStepFormStepperItem } from '@/ui/MultiStepForm';

export function NewForm() {
  return (
    <MultiStepForm min={1} max={3}>
      <MultiStepFormStepper>
        <MultiStepFormStepperItem step={1} title="Form 1" />
        <MultiStepFormStepperItem step={2} title="Form 2" />
        <MultiStepFormStepperItem step={3} title="Form 3" />
      </MultiStepFormStepper>

      <MultiStepFormItems className="flex justify-center items-start">
        <MultiStepFormItem step={1}><Form1 /></MultiStepFormItem>
        <MultiStepFormItem step={2}><Form2 /></MultiStepFormItem>
        <MultiStepFormItem step={3}><Form3 /></MultiStepFormItem>
      </MultiStepFormItems>
    </MultiStepForm>
  );
}
