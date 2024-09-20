import { FaPoundSign } from 'react-icons/fa';
import {
  FormProvider,
  Form,
  FormTitle,
  FormField,
  FormGroup,
  useZodForm,
} from '@/ui/form/Form';
import { Input } from '@/ui/form/Input';
import { Button } from '@/ui/Button';
import { useMultiStepFormContext } from '@/ui/form/MultiStepForm';
import { addNewHireAgreementDetailsSchema, AddNewHireAgreementDetailsSchema } from '@/features/hires/addNewHire/schemas';
import { Dropzone } from '@/ui/form/Dropzone';

export function AddNewHireAgreementDetailsForm() {
  const {
    formState,
    prevStep,
    nextStep,
    updateFormState,
  } = useMultiStepFormContext<AddNewHireAgreementDetailsSchema>();

  const form = useZodForm({
    schema: addNewHireAgreementDetailsSchema,
    defaultValues: formState,
  });

  const handleSubmit = form.handleSubmit((data) => {
    updateFormState(data);
    nextStep();
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  });

  const goPrevStep = () => {
    prevStep();
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  return (
    <FormProvider {...form}>
      <Form
        onSubmit={handleSubmit}
        className="w-full max-w-[32rem] space-y-4"
      >
        <FormTitle>Hire</FormTitle>

        <FormField
          control={form.control}
          name="rent_amount"
          render={({ field }) => (
            <FormGroup label="* Rent Amount">
              <Input placeholder="Rent Amount" leftIcon={<FaPoundSign className="text-sm" />} {...field} />
            </FormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="deposit_amount"
          render={({ field }) => (
            <FormGroup label="* Deposit Amount">
              <Input placeholder="Deposit Amount" leftIcon={<FaPoundSign className="text-sm" />} {...field} />
            </FormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="start_date"
          render={({ field }) => (
            <FormGroup label="* Start Date">
              <Input
                placeholder="Start Date"
                type="date"
                onFocus={(event) => event.target.showPicker()}
                {...field}
              />
            </FormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="end_date"
          render={({ field }) => (
            <FormGroup label="End Date">
              <Input
                placeholder="End Date"
                type="date"
                onFocus={(event) => event.target.showPicker()}
                {...field}
              />
            </FormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="permission_letter_document_path"
          render={({ field }) => (
            <FormGroup label="Permission Letter">
              <Dropzone
                defaultValue={field.value}
                onChange={field.onChange}
                onReset={() => form.resetField(field.name)}
                accept="image/*,.pdf"
              />
            </FormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="contract_document_path"
          render={({ field }) => (
            <FormGroup label="Contract">
              <Dropzone
                defaultValue={field.value}
                onChange={field.onChange}
                onReset={() => form.resetField(field.name)}
                accept="image/*,.pdf"
              />
            </FormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="deposit_receipt_document_path"
          render={({ field }) => (
            <FormGroup label="Deposit Receipt">
              <Dropzone
                defaultValue={field.value}
                onChange={field.onChange}
                onReset={() => form.resetField(field.name)}
                accept="image/*,.pdf"
              />
            </FormGroup>
          )}
        />

        <div className="pt-3 flex justify-between gap-3 flex-wrap-reverse">
          <Button type="button" variant="outline" onClick={goPrevStep}>Back</Button>
          <Button type="submit" variant="primary">Next</Button>
        </div>
      </Form>
    </FormProvider>
  );
}
