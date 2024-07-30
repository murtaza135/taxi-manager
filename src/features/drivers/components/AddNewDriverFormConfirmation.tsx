import { Link } from 'react-router-dom';
import { FormConfirmation, FormConfirmationTitle, FormConfirmationHeader, FormConfirmationField } from '@/ui/form/FormConfirmation';
import { useMultiStepFormContext } from '@/ui/form/MultiStepForm';
import { Button } from '@/ui/Button';
import { Separator } from '@/ui/Separator';
import { addNewDriverSchema, AddNewDriverSchema } from '@/features/drivers/schemas';

export function AddNewDriverFormConfirmation() {
  const { formState, prevStep, setStep } = useMultiStepFormContext<AddNewDriverSchema>();

  const handleSubmit = () => {
    const result = addNewDriverSchema.safeParse(formState);
    if (result.success) {
      console.log(result.data);
    } else {
      console.log(result.error.errors);
    }
  };

  const goPrevStep = () => {
    prevStep();
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  return (
    <FormConfirmation>
      <FormConfirmationTitle>Confirmation</FormConfirmationTitle>

      <div className="space-y-4">
        <FormConfirmationHeader title="Driver" onEdit={() => setStep(1)} />
        <div className="space-y-2">
          <FormConfirmationField title="First Name" value={formState.first_names} />
          <FormConfirmationField title="Last Name" value={formState.last_name} />
          <FormConfirmationField title="Email" value={formState.email} />
          <FormConfirmationField title="Phone Number" value={formState.phone_number} />
          <FormConfirmationField title="National Insurance Number" value={formState.national_insurance_number} />
          <FormConfirmationField title="Date of Birth" value={formState.date_of_birth} />
          <FormConfirmationField title="Picture" value={formState.picture?.[0]?.name} />
        </div>
      </div>

      <div className="space-y-4">
        <FormConfirmationHeader title="Drivers Licence" onEdit={() => setStep(2)} />
        <div className="space-y-2">
          <FormConfirmationField title="Licence Number" value={formState.licence_number} />
          <FormConfirmationField title="Start Date" value={formState.licence_start_date} />
          <FormConfirmationField title="End Date" value={formState.licence_end_date} />
          <FormConfirmationField title="Drivers Licence" value={formState.licence_document?.[0]?.name} />
        </div>
      </div>

      <div className="space-y-4">
        <FormConfirmationHeader title="Taxi Badge" onEdit={() => setStep(3)} />
        <div className="space-y-2">
          <FormConfirmationField title="Badge Number" value={formState.badge_number} />
          <FormConfirmationField title="Start Date" value={formState.badge_start_date} />
          <FormConfirmationField title="End Date" value={formState.badge_end_date} />
          <FormConfirmationField title="Taxi Badge" value={formState.badge_document?.[0]?.name} />
        </div>
      </div>

      <Separator className="bg-primary-dark dark:bg-primary-light" />

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={goPrevStep}>Back</Button>
        <Link to="/drivers">
          <Button type="button" variant="danger">Cancel</Button>
        </Link>
        <Button type="button" variant="primary" onClick={handleSubmit}>Submit</Button>
      </div>
    </FormConfirmation>
  );
}
