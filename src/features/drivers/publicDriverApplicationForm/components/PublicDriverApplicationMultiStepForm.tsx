/* eslint-disable max-len */
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import {
  MultiStepForm,
  MultiStepFormItems,
  MultiStepFormItem,
  MultiStepFormStepper,
  MultiStepFormStepperItem,
} from '@/ui/form/MultiStepForm';
import { PublicDriverApplicationCompanyDetailsForm } from '@/features/drivers/publicDriverApplicationForm/components/PublicDriverApplicationCompanyDetailsForm';
import { PublicDriverApplicationDetailsForm } from '@/features/drivers/publicDriverApplicationForm/components/PublicDriverApplicationDetailsForm';
import { PublicDriverApplicationDriversLicenceForm } from '@/features/drivers/publicDriverApplicationForm/components/PublicDriverApplicationDriversLicenceForm';
import { PublicDriverApplicationTaxiBadgeForm } from '@/features/drivers/publicDriverApplicationForm/components/PublicDriverApplicationTaxiBadgeForm';
import { PublicDriverApplicationFormConfirmation } from '@/features/drivers/publicDriverApplicationForm/components/PublicDriverApplicationFormConfirmation';
import { PublicDriverApplicationNullableFileListSchema } from '@/features/drivers/publicDriverApplicationForm/schemas';
import { useDriverApplication } from '@/features/drivers/general/hooks/useDriverApplication';
import { capitalizeEachWord } from '@/utils/string/capitalizeEachWord';

export function PublicDriverApplicationMultiStepForm() {
  const application_id = useParams().id as string;
  const { data } = useDriverApplication(application_id);
  const { name } = data;

  const initialFormState: PublicDriverApplicationNullableFileListSchema = useMemo(() => ({
    name: capitalizeEachWord(name),
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
  }), [name]);

  return (
    <MultiStepForm min={1} max={5} initialFormState={initialFormState}>
      <MultiStepFormStepper>
        <MultiStepFormStepperItem step={1} title="Company" />
        <MultiStepFormStepperItem step={2} title="Driver" />
        <MultiStepFormStepperItem step={3} title="Drivers Licence" />
        <MultiStepFormStepperItem step={4} title="Taxi Badge" />
        <MultiStepFormStepperItem step={5} title="Confirmation" />
      </MultiStepFormStepper>

      <MultiStepFormItems className="flex justify-center items-start">
        <MultiStepFormItem step={1}><PublicDriverApplicationCompanyDetailsForm /></MultiStepFormItem>
        <MultiStepFormItem step={2}><PublicDriverApplicationDetailsForm /></MultiStepFormItem>
        <MultiStepFormItem step={3}><PublicDriverApplicationDriversLicenceForm /></MultiStepFormItem>
        <MultiStepFormItem step={4}><PublicDriverApplicationTaxiBadgeForm /></MultiStepFormItem>
        <MultiStepFormItem step={5}><PublicDriverApplicationFormConfirmation /></MultiStepFormItem>
      </MultiStepFormItems>
    </MultiStepForm>
  );
}
