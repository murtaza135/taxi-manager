import {
  MultiStepForm,
  MultiStepFormItems,
  MultiStepFormItem,
  MultiStepFormStepper,
  MultiStepFormStepperItem,
} from '@/ui/form/MultiStepForm';
import { AddNewDriverDetailsForm } from '@/features/drivers/components/AddNewDriverDetailsForm';
import { AddNewDriversLicenceForm } from '@/features/drivers/components/AddNewDriversLicenceForm';
import { AddNewDriverTaxiBadgeForm } from '@/features/drivers/components/AddNewDriverTaxiBadgeForm';

export function AddNewDriverMultiStepForm() {
  return (
    <MultiStepForm min={1} max={3}>
      <MultiStepFormStepper>
        <MultiStepFormStepperItem step={1} title="Driver" />
        <MultiStepFormStepperItem step={2} title="Drivers Licence" />
        <MultiStepFormStepperItem step={3} title="Taxi Badge" />
      </MultiStepFormStepper>

      <MultiStepFormItems className="flex justify-center items-start">
        <MultiStepFormItem step={1}><AddNewDriverDetailsForm /></MultiStepFormItem>
        <MultiStepFormItem step={2}><AddNewDriversLicenceForm /></MultiStepFormItem>
        <MultiStepFormItem step={3}><AddNewDriverTaxiBadgeForm /></MultiStepFormItem>
      </MultiStepFormItems>
    </MultiStepForm>
  );
}
