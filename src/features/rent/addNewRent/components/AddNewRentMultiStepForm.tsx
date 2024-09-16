import {
  MultiStepForm,
  MultiStepFormItems,
  MultiStepFormItem,
  MultiStepFormStepper,
  MultiStepFormStepperItem,
} from '@/ui/form/MultiStepForm';
import { AddHireAgreementToRentForm } from '@/features/rent/addNewRent/components/AddHireAgreementToRentForm';
import { AddNewRentDetailsForm } from '@/features/rent/addNewRent/components/AddNewRentDetailsForm';
import { AddNewRentConfirmationForm } from '@/features/rent/addNewRent/components/AddNewRentConfirmationForm';
import { AddNewRentSchema } from '@/features/rent/addNewRent/schemas';

const initialFormState: AddNewRentSchema = {
  hire_id: -1,
  driver_name: '',
  taxi_number_plate: '',
  taxi_licence_phc_number: '',
  amount: '',
  start_date: '',
  end_date: '',
};

export function AddNewRentMultiStepForm() {
  return (
    <MultiStepForm min={1} max={3} initialFormState={initialFormState}>
      <MultiStepFormStepper>
        <MultiStepFormStepperItem step={1} title="Hire" />
        <MultiStepFormStepperItem step={2} title="Details" />
        <MultiStepFormStepperItem step={3} title="Confirmation" />
      </MultiStepFormStepper>

      <MultiStepFormItems className="flex justify-center items-start">
        <MultiStepFormItem step={1}><AddHireAgreementToRentForm /></MultiStepFormItem>
        <MultiStepFormItem step={2}><AddNewRentDetailsForm /></MultiStepFormItem>
        <MultiStepFormItem step={3}><AddNewRentConfirmationForm /></MultiStepFormItem>
      </MultiStepFormItems>
    </MultiStepForm>
  );
}
