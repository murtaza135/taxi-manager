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
import { addNewDriverTaxiBadgeSchema, AddNewDriverTaxiBadgeSchema } from '@/features/drivers/schemas';

export function AddNewDriverTaxiBadgeForm() {
  const {
    formState,
    nextStep,
    prevStep,
    updateFormState,
  } = useMultiStepFormContext<AddNewDriverTaxiBadgeSchema>();

  const form = useZodForm({
    schema: addNewDriverTaxiBadgeSchema,
    defaultValues: formState,
  });

  // @source https://medium.com/@damien_16960/input-file-x-shadcn-x-zod-88f0472c2b81
  const fileField = form.registerFileList('badge_document');

  const handleSubmit = form.handleSubmit((data) => {
    updateFormState(data);
    nextStep();
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  });

  const goPrevStep = () => {
    prevStep();
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const goNextStep = () => {
    nextStep();
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
          render={() => (
            <FormGroup label="Taxi Badge">
              <Input placeholder="Taxi Badge" type="file" accept="image/*,.pdf" {...fileField} />
            </FormGroup>
          )}
        />

        <div className="pt-3 flex justify-between gap-3 flex-wrap-reverse">
          <Button type="button" variant="outline" onClick={goPrevStep}>Back</Button>
          <div className="flex gap-3 flex-wrap-reverse">
            <Button type="button" variant="outline" onClick={goNextStep}>Skip</Button>
            <Button type="submit" variant="primary">Next</Button>
          </div>
        </div>
      </Form>
    </FormProvider>
  );
}
