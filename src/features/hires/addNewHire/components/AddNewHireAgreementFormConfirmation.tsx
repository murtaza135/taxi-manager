import { Link, useNavigate } from 'react-router-dom';
import { useMultiStepFormContext } from '@/ui/form/MultiStepForm';
import { Button } from '@/ui/Button';
import { Separator } from '@/ui/Separator';
import { addNewHireAgreementSchema, AddNewHireAgreementSchema, addNewHireAgreementTransformer } from '@/features/hires/addNewHire/schemas';
import { useZodForm, FormProvider, Form, FormTitle, FormSection, FormField } from '@/ui/form/Form';
import { ReadOnlyInput } from '@/ui/form/Input';
import { useToast } from '@/ui/toast';
import { useAddNewHireAgreement } from '@/features/hires/general/hooks/useAddNewHireAgreement';

export function AddNewHireAgreementFormConfirmation() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { mutate: addNewHireAgreement } = useAddNewHireAgreement();

  const {
    formState,
    prevStep,
    setStep,
  } = useMultiStepFormContext<AddNewHireAgreementSchema>();

  const form = useZodForm({
    schema: addNewHireAgreementSchema,
    defaultValues: formState,
    shouldFocusError: false,
  });

  // @source https://medium.com/@damien_16960/input-file-x-shadcn-x-zod-88f0472c2b81
  const permissionLetterField = form.registerFileList('permission_letter_document_path');
  const contractField = form.registerFileList('contract_document_path');
  const depositReceiptField = form.registerFileList('deposit_receipt_document_path');

  const handleSubmit = form.handleSubmit(
    (data) => {
      const transformedData = addNewHireAgreementTransformer(data);
      addNewHireAgreement(transformedData, {
        onSuccess: (id) => navigate(`/hire/${id}`, { preventScrollReset: false }),
      });
    },
    () => {
      toast({
        title: 'Something went wrong',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    },
  );

  const goPrevStep = () => {
    prevStep();
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  return (
    <FormProvider {...form}>
      <Form
        onSubmit={handleSubmit}
        className="w-full max-w-[32rem] space-y-8"
      >
        <FormTitle>Confirmation</FormTitle>

        <FormSection title="Taxi" onEdit={() => setStep(1)}>
          <FormField
            control={form.control}
            name="number_plate"
            render={({ field }) => (
              <ReadOnlyInput title="Number Plate" className="uppercase" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="phc_number"
            render={({ field }) => (
              <ReadOnlyInput title="PH Number" className="uppercase" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="make"
            render={({ field }) => (
              <ReadOnlyInput title="Make" className="capitalize" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <ReadOnlyInput title="Model" className="capitalize" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="colour"
            render={({ field }) => (
              <ReadOnlyInput title="Colour" className="capitalize" {...field} />
            )}
          />
        </FormSection>

        <FormSection title="Driver" onEdit={() => setStep(2)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <ReadOnlyInput title="PHC Number" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <ReadOnlyInput title="Email" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <ReadOnlyInput title="Phone Number" {...field} />
            )}
          />
        </FormSection>

        <FormSection title="Insurance" onEdit={() => setStep(3)}>
          <FormField
            control={form.control}
            name="rent_amount"
            render={({ field }) => (
              <ReadOnlyInput title="Rent Amount" {...field} value={`£${field.value}`} />
            )}
          />

          <FormField
            control={form.control}
            name="deposit_amount"
            render={({ field }) => (
              <ReadOnlyInput title="Deposit Amount" {...field} value={`£${field.value}`} />
            )}
          />

          <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
              <ReadOnlyInput title="Start Date" type="date" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="end_date"
            render={({ field }) => (
              <ReadOnlyInput title="End Date" type="date" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="permission_letter_document_path"
            render={() => (
              <ReadOnlyInput title="Permission Letter" type="file" accept="image/*,.pdf" {...permissionLetterField} />
            )}
          />

          <FormField
            control={form.control}
            name="contract_document_path"
            render={() => (
              <ReadOnlyInput title="Contract" type="file" accept="image/*,.pdf" {...contractField} />
            )}
          />

          <FormField
            control={form.control}
            name="deposit_receipt_document_path"
            render={() => (
              <ReadOnlyInput title="Deposit Receipt" type="file" accept="image/*,.pdf" {...depositReceiptField} />
            )}
          />
        </FormSection>

        <Separator className="bg-primary-dark dark:bg-primary-light" />

        <div className="pt-3 flex justify-between gap-3 flex-wrap-reverse">
          <Button type="button" variant="outline" onClick={goPrevStep}>Back</Button>
          <div className="flex gap-3 flex-wrap-reverse">
            <Link to="/taxis">
              <Button type="button" variant="danger">Cancel</Button>
            </Link>
            <Button type="submit" variant="primary">Submit</Button>
          </div>
        </div>
      </Form>
    </FormProvider>
  );
}
