import { Link } from 'react-router-dom';
import { useMultiStepFormContext } from '@/ui/form/MultiStepForm';
import { Button } from '@/ui/Button';
import { Separator } from '@/ui/Separator';
import { addNewDriverSchema, AddNewDriverSchema, addNewDriverTransformer } from '@/features/drivers/schemas';
import { useZodForm, FormProvider, Form, FormTitle, FormSection, FormField } from '@/ui/form/Form';
import { DisplayInput } from '@/ui/form/Input';
import { useToast } from '@/ui/toast';

export function AddNewDriverFormConfirmation() {
  const { toast } = useToast();
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
      console.log(transformedData);
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
            name="first_names"
            render={({ field }) => (
              <DisplayInput title="First Name" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <DisplayInput title="Last Name" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <DisplayInput title="Email" type="email" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <DisplayInput title="Phone Number" type="tel" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="national_insurance_number"
            render={({ field }) => (
              <DisplayInput title="National Insurance Number" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="date_of_birth"
            render={({ field }) => (
              <DisplayInput title="Date of Birth" type="date" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="picture"
            render={() => (
              <DisplayInput title="Picture" type="file" accept="image/*" {...driverPictureFileListField} />
            )}
          />
        </FormSection>

        <FormSection title="Drivers Licence" onEdit={() => setStep(2)}>
          <FormField
            control={form.control}
            name="licence_number"
            render={({ field }) => (
              <DisplayInput title="Licence Number" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="licence_start_date"
            render={({ field }) => (
              <DisplayInput title="Start Date" type="date" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="licence_end_date"
            render={({ field }) => (
              <DisplayInput title="End Date" type="date" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="licence_document"
            render={() => (
              <DisplayInput title="Drivers Licence" type="file" accept="image/*,.pdf" {...driversLicenceFileListField} />
            )}
          />
        </FormSection>

        <FormSection title="Taxi Badge" onEdit={() => setStep(3)}>
          <FormField
            control={form.control}
            name="badge_number"
            render={({ field }) => (
              <DisplayInput title="Badge Number" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="badge_start_date"
            render={({ field }) => (
              <DisplayInput title="Start Date" type="date" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="badge_end_date"
            render={({ field }) => (
              <DisplayInput title="End Date" type="date" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="badge_document"
            render={() => (
              <DisplayInput title="Taxi Badge" type="file" accept="image/*,.pdf" {...taxiBadgeFileListField} />
            )}
          />
        </FormSection>

        <Separator className="bg-primary-dark dark:bg-primary-light" />

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={goPrevStep}>Back</Button>
          <Link to="/drivers">
            <Button type="button" variant="danger">Cancel</Button>
          </Link>
          <Button type="submit" variant="primary">Submit</Button>
        </div>
      </Form>
    </FormProvider>
  );
}
