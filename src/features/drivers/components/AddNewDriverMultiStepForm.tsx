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
import { AddNewDriverFormConfirmation } from '@/features/drivers/components/AddNewDriverFormConfirmation';
import { AddNewDriverSchema } from '@/features/drivers/schemas';

const initialFormState: AddNewDriverSchema = {
  first_names: '',
  last_name: '',
  email: '',
  phone_number: '',
  national_insurance_number: '',
  date_of_birth: '',
  picture: undefined,
  licence_number: '',
  licence_start_date: '',
  licence_end_date: '',
  licence_document: undefined,
  badge_number: '',
  badge_start_date: '',
  badge_end_date: '',
  badge_document: undefined,
};

export function AddNewDriverMultiStepForm() {
  return (
    <MultiStepForm min={1} max={4} initialStep={4} initialFormState={initialFormState}>
      <MultiStepFormStepper>
        <MultiStepFormStepperItem step={1} title="Driver" />
        <MultiStepFormStepperItem step={2} title="Drivers Licence" />
        <MultiStepFormStepperItem step={3} title="Taxi Badge" />
        <MultiStepFormStepperItem step={4} title="Confirmation" />
      </MultiStepFormStepper>

      <MultiStepFormItems className="flex justify-center items-start">
        <MultiStepFormItem step={1}><AddNewDriverDetailsForm /></MultiStepFormItem>
        <MultiStepFormItem step={2}><AddNewDriversLicenceForm /></MultiStepFormItem>
        <MultiStepFormItem step={3}><AddNewDriverTaxiBadgeForm /></MultiStepFormItem>
        <MultiStepFormItem step={4}><AddNewDriverFormConfirmation /></MultiStepFormItem>
      </MultiStepFormItems>
    </MultiStepForm>
  );
}
