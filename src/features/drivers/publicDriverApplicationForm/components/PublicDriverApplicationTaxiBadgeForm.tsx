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
import { publicDriverApplicationTaxiBadgeSchema, PublicDriverApplicationTaxiBadgeSchema } from '@/features/drivers/publicDriverApplicationForm/schemas';
import { Dropzone } from '@/ui/form/Dropzone';

export function PublicDriverApplicationTaxiBadgeForm() {
  const {
    formState,
    nextStep,
    prevStep,
    updateFormState,
  } = useMultiStepFormContext<PublicDriverApplicationTaxiBadgeSchema>();

  const form = useZodForm({
    schema: publicDriverApplicationTaxiBadgeSchema,
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
        <FormTitle>Taxi Badge</FormTitle>

        <FormField
          control={form.control}
          name="badge_number"
          render={({ field }) => (
            <FormGroup label="* Badge Number">
              <Input placeholder="Badge Number" {...field} />
            </FormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="badge_start_date"
          render={({ field }) => (
            <FormGroup label="Start Date">
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
          name="badge_end_date"
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
          name="badge_document"
          render={({ field }) => (
            <FormGroup label="* Taxi Badge (Front)">
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
          name="badge_document2"
          render={({ field }) => (
            <FormGroup label="* Taxi Badge (Back)">
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
