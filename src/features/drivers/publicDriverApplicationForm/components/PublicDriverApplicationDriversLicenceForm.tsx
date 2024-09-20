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
import { publicDriverApplicationLicenceSchema, PublicDriverApplicationLicenceSchema } from '@/features/drivers/publicDriverApplicationForm/schemas';
import { Dropzone } from '@/ui/form/Dropzone';

export function PublicDriverApplicationDriversLicenceForm() {
  const {
    formState,
    nextStep,
    prevStep,
    updateFormState,
  } = useMultiStepFormContext<PublicDriverApplicationLicenceSchema>();

  const form = useZodForm({
    schema: publicDriverApplicationLicenceSchema,
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
        <FormTitle>Drivers Licence</FormTitle>

        <FormField
          control={form.control}
          name="licence_number"
          render={({ field }) => (
            <FormGroup label="* Licence Number">
              <Input placeholder="Licence Number" className="[&>input]:uppercase [&>input]:placeholder:normal-case" {...field} />
            </FormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="licence_start_date"
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
          name="licence_end_date"
          render={({ field }) => (
            <FormGroup label="* End Date">
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
          name="licence_document"
          render={({ field }) => (
            <FormGroup label="* Drivers Licence">
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
