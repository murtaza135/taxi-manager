import { useParams, useNavigate } from 'react-router-dom';
import { useMultiStepFormContext } from '@/ui/form/MultiStepForm';
import { Button } from '@/ui/Button';
import { Separator } from '@/ui/Separator';
import { publicDriverApplicationSchema, PublicDriverApplicationSchema, publicDriverApplicationTransformer } from '@/features/drivers/publicDriverApplicationForm/schemas';
import { useZodForm, FormProvider, Form, FormTitle, FormSection, FormField } from '@/ui/form/Form';
import { ReadOnlyInput } from '@/ui/form/Input';
import { useToast } from '@/ui/toast';
import { useSubmitDriverApplication, Variables as SubmitDriverApplicationVariables } from '@/features/drivers/general/hooks/useSubmitDriverApplication';

export function PublicDriverApplicationFormConfirmation() {
  const id = useParams().id as string;
  const navigate = useNavigate();
  const { toast } = useToast();
  const { mutate: submitDriverApplication } = useSubmitDriverApplication();

  const {
    formState,
    prevStep,
    setStep,
  } = useMultiStepFormContext<PublicDriverApplicationSchema>();

  const form = useZodForm({
    schema: publicDriverApplicationSchema,
    defaultValues: formState,
    shouldFocusError: false,
  });

  // @source https://medium.com/@damien_16960/input-file-x-shadcn-x-zod-88f0472c2b81
  const driverPictureFileListField = form.registerFileList('picture');
  const driversLicenceFileListField = form.registerFileList('licence_document');
  const taxiBadgeFileListField = form.registerFileList('badge_document');

  const handleSubmit = form.handleSubmit(
    (data) => {
      const transformedData = publicDriverApplicationTransformer(data);

      const submissionData: SubmitDriverApplicationVariables = {
        ...transformedData,
        id,
        drivers_licence_number: transformedData.licence_number,
        drivers_licence_start_date: transformedData.licence_start_date,
        drivers_licence_end_date: transformedData.licence_end_date,
        taxi_badge_number: transformedData.badge_number,
        taxi_badge_start_date: transformedData.badge_start_date ?? null,
        taxi_badge_end_date: transformedData.badge_end_date,
        picture: transformedData.picture,
        drivers_licence: transformedData.licence_document,
        taxi_badge: transformedData.badge_document,
      };

      submitDriverApplication(submissionData, {
        onSuccess: () => navigate(`/driver-application/${id}/complete`),
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
          <Button type="submit" variant="primary">Submit</Button>
        </div>
      </Form>
    </FormProvider>
  );
}