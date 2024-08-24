import {
  MultiStepForm,
  MultiStepFormItems,
  MultiStepFormItem,
  MultiStepFormStepper,
  MultiStepFormStepperItem,
} from '@/ui/form/MultiStepForm';
import { AddNewTaxiDetailsForm } from '@/features/taxis/addNewTaxi/components/AddNewTaxiDetailsForm';
import { AddNewTaxiLicenceDetailsForm } from '@/features/taxis/addNewTaxi/components/AddNewTaxiLicenceDetailsForm';
import { AddNewTaxiInsuranceForm } from '@/features/taxis/addNewTaxi/components/AddNewTaxiInsuranceForm';
import { AddNewTaxiFormConfirmation } from '@/features/taxis/addNewTaxi/components/AddNewTaxiFormConfirmation';
import { AddNewTaxiSchema } from '@/features/taxis/addNewTaxi/schemas';

const initialFormState: AddNewTaxiSchema = {
  number_plate: '',
  make: '',
  model: '',
  colour: '',
  chassis_number: '',
  registration_date: '',
  expected_expiry_date: '',
  road_tax_expiry_date: '',
  cc: Number.NaN,
  fuel_type: '',
  picture_path: undefined,
  logbook_document_path: undefined,
  compliance_certificate_licence_number: '',
  phc_number: '',
  taxi_licence_start_date: '',
  taxi_licence_end_date: '',
  compliance_certificate_document_path: undefined,
  phc_licence_document_path: undefined,
  policy_number: '',
  is_any_driver: true,
  insurance_start_date: '',
  insurance_end_date: '',
  insurance_document_path: undefined,
};

export function AddNewTaxiMultiStepForm() {
  return (
    <MultiStepForm min={1} max={4} initialFormState={initialFormState}>
      <MultiStepFormStepper>
        <MultiStepFormStepperItem step={1} title="Taxi" />
        <MultiStepFormStepperItem step={2} title="Taxi Licence" />
        <MultiStepFormStepperItem step={3} title="Insurance" />
        <MultiStepFormStepperItem step={4} title="Confirmation" />
      </MultiStepFormStepper>

      <MultiStepFormItems className="flex justify-center items-start">
        <MultiStepFormItem step={1}><AddNewTaxiDetailsForm /></MultiStepFormItem>
        <MultiStepFormItem step={2}><AddNewTaxiLicenceDetailsForm /></MultiStepFormItem>
        <MultiStepFormItem step={3}><AddNewTaxiInsuranceForm /></MultiStepFormItem>
        <MultiStepFormItem step={4}><AddNewTaxiFormConfirmation /></MultiStepFormItem>
      </MultiStepFormItems>
    </MultiStepForm>
  );
}
