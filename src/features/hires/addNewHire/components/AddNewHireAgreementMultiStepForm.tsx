import {
  MultiStepForm,
  MultiStepFormItems,
  MultiStepFormItem,
  MultiStepFormStepper,
  MultiStepFormStepperItem,
} from '@/ui/form/MultiStepForm';
import { AddNewHireAgreementSchema } from '@/features/hires/addNewHire/schemas';
import { AddTaxiToHireAgreementForm } from '@/features/hires/addNewHire/components/AddTaxiToHireAgreementForm';
import { AddDriverToHireAgreementForm } from '@/features/hires/addNewHire/components/AddDriverToHireAgreementForm';
import { AddNewHireAgreementDetailsForm } from '@/features/hires/addNewHire/components/AddNewHireAgreementDetailsForm';
import { AddNewHireAgreementFormConfirmation } from '@/features/hires/addNewHire/components/AddNewHireAgreementFormConfirmation';

const initialFormState: AddNewHireAgreementSchema = {
  taxi_id: -1,
  driver_id: -1,
  rent_amount: '',
  deposit_amount: '',
  start_date: '',
  end_date: '',
  permission_letter_document_path: undefined,
  contract_document_path: undefined,
  deposit_receipt_document_path: undefined,
};

export function AddNewHireMultiStepForm() {
  return (
    <MultiStepForm min={1} max={4} initialFormState={initialFormState}>
      <MultiStepFormStepper>
        <MultiStepFormStepperItem step={1} title="Taxi" />
        <MultiStepFormStepperItem step={2} title="Driver" />
        <MultiStepFormStepperItem step={3} title="Details" />
        <MultiStepFormStepperItem step={4} title="Confirmation" />
      </MultiStepFormStepper>

      <MultiStepFormItems className="flex justify-center items-start">
        <MultiStepFormItem step={1}><AddTaxiToHireAgreementForm /></MultiStepFormItem>
        <MultiStepFormItem step={2}><AddDriverToHireAgreementForm /></MultiStepFormItem>
        <MultiStepFormItem step={3}><AddNewHireAgreementDetailsForm /></MultiStepFormItem>
        <MultiStepFormItem step={4}><AddNewHireAgreementFormConfirmation /></MultiStepFormItem>
      </MultiStepFormItems>
    </MultiStepForm>
  );
}
