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

export function AddNewHireAgreementDetailsForm() {
  const {
    formState,
    nextStep,
    updateFormState,
  } = useMultiStepFormContext<AddNewHireAgreementDetailsSchema>();

  const form = useZodForm({
    schema: addNewHireAgreementDetailsSchema,
    defaultValues: formState,
  });

  // @source https://medium.com/@damien_16960/input-file-x-shadcn-x-zod-88f0472c2b81
  const permissionLetterDocumentField = form.registerFileList('permission_letter_document_path');
  const contractDocumentField = form.registerFileList('contract_document_path');
  const depositReceiptDocumentField = form.registerFileList('deposit_receipt_document_path');

  const handleSubmit = form.handleSubmit((data) => {
    updateFormState(data);
    nextStep();
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  });

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
              <Input placeholder="Rent Amount" {...field} />
            </FormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="deposit_amount"
          render={({ field }) => (
            <FormGroup label="* Deposit Amount">
              <Input placeholder="Deposit Amount" {...field} />
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
          render={() => (
            <FormGroup label="Permission Letter">
              <Input type="file" placeholder="Permission Letter" accept="image/*,.pdf" {...permissionLetterDocumentField} />
            </FormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="contract_document_path"
          render={() => (
            <FormGroup label="Contract">
              <Input type="file" placeholder="Contract" accept="image/*,.pdf" {...contractDocumentField} />
            </FormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="deposit_receipt_document_path"
          render={() => (
            <FormGroup label="Deposit Receipt">
              <Input type="file" placeholder="Deposit Receipt" accept="image/*,.pdf" {...depositReceiptDocumentField} />
            </FormGroup>
          )}
        />

        <div className="pt-3 flex justify-end gap-3">
          <Button type="submit" variant="primary">Next</Button>
        </div>
      </Form>
    </FormProvider>
  );
}
