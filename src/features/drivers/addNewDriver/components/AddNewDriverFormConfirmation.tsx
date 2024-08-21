import { Link, useNavigate } from 'react-router-dom';
import { useMultiStepFormContext } from '@/ui/form/MultiStepForm';
import { Button } from '@/ui/Button';
import { Separator } from '@/ui/Separator';
import { addNewDriverSchema, AddNewDriverSchema, addNewDriverTransformer } from '@/features/drivers/addNewDriver/schemas';
import { useZodForm, FormProvider, Form, FormTitle, FormSection, FormField } from '@/ui/form/Form';
import { ReadOnlyInput } from '@/ui/form/Input';
import { useToast } from '@/ui/toast';
import { useAddNewDriver } from '@/features/drivers/general/hooks/useAddNewDriver';

export function AddNewDriverFormConfirmation() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { mutate: addNewDriver } = useAddNewDriver();

  const {
    formState,
    prevStep,
    setStep,
  } = useMultiStepFormContext<AddNewDriverSchema>();

  const form = useZodForm({
    schema: addNewDriverSchema,
    defaultValues: formState,
    shouldFocusError: false,
  });

  // @source https://medium.com/@damien_16960/input-file-x-shadcn-x-zod-88f0472c2b81
  const driverPictureFileListField = form.registerFileList('picture');
  const driversLicenceFileListField = form.registerFileList('licence_document');
  const taxiBadgeFileListField = form.registerFileList('badge_document');

  const handleSubmit = form.handleSubmit(
    (data) => {
      const transformedData = addNewDriverTransformer(data);
      addNewDriver(transformedData, {
        onSuccess: () => navigate('/drivers', { preventScrollReset: false }),
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

        <FormSection title="Driver" onEdit={() => setStep(1)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <ReadOnlyInput title="Name" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <ReadOnlyInput title="Email" type="email" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <ReadOnlyInput title="Phone Number" type="tel" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="national_insurance_number"
            render={({ field }) => (
              <ReadOnlyInput title="National Insurance Number" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="date_of_birth"
            render={({ field }) => (
              <ReadOnlyInput title="Date of Birth" type="date" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="picture"
            render={() => (
              <ReadOnlyInput title="Picture" type="file" accept="image/*" {...driverPictureFileListField} />
            )}
          />
        </FormSection>

        <FormSection title="Drivers Licence" onEdit={() => setStep(2)}>
          <FormField
            control={form.control}
            name="licence_number"
            render={({ field }) => (
              <ReadOnlyInput title="Licence Number" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="licence_start_date"
            render={({ field }) => (
              <ReadOnlyInput title="Start Date" type="date" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="licence_end_date"
            render={({ field }) => (
              <ReadOnlyInput title="End Date" type="date" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="licence_document"
            render={() => (
              <ReadOnlyInput title="Drivers Licence" type="file" accept="image/*,.pdf" {...driversLicenceFileListField} />
            )}
          />
        </FormSection>

        <FormSection title="Taxi Badge" onEdit={() => setStep(3)}>
          <FormField
            control={form.control}
            name="badge_number"
            render={({ field }) => (
              <ReadOnlyInput title="Badge Number" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="badge_start_date"
            render={({ field }) => (
              <ReadOnlyInput title="Start Date" type="date" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="badge_end_date"
            render={({ field }) => (
              <ReadOnlyInput title="End Date" type="date" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="badge_document"
            render={() => (
              <ReadOnlyInput title="Taxi Badge" type="file" accept="image/*,.pdf" {...taxiBadgeFileListField} />
            )}
          />
        </FormSection>

        <Separator className="bg-primary-dark dark:bg-primary-light" />

        <div className="pt-3 flex justify-between gap-3 flex-wrap-reverse">
          <Button type="button" variant="outline" onClick={goPrevStep}>Back</Button>
          <div className="flex gap-3 flex-wrap-reverse">
            <Link to="/drivers">
              <Button type="button" variant="danger">Cancel</Button>
            </Link>
            <Button type="submit" variant="primary">Submit</Button>
          </div>
        </div>
      </Form>
    </FormProvider>
  );
}
