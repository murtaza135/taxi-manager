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
import { addNewDriversLicenceSchema, AddNewDriversLicenceSchema } from '@/features/drivers/schemas';

const defaultValues: AddNewDriversLicenceSchema = {
  licence_number: '',
  licence_start_date: '',
  licence_end_date: '',
  licence_document: undefined,
};

export function AddNewDriversLicenceForm() {
  const {
    nextStep,
    prevStep,
    updateFormState,
  } = useMultiStepFormContext<AddNewDriversLicenceSchema>();

  const form = useZodForm({
    schema: addNewDriversLicenceSchema,
    defaultValues,
  });

  // @source https://medium.com/@damien_16960/input-file-x-shadcn-x-zod-88f0472c2b81
  const fileField = form.register('licence_document');

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
              <Input placeholder="Licence Number" {...field} />
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
          render={() => (
            <FormGroup label="Drivers Licence">
              <Input placeholder="Drivers Licence" type="file" accept="image/*,.pdf" {...fileField} />
            </FormGroup>
          )}
        />

        <div className="pt-3 flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={goPrevStep}>Back</Button>
          <Button type="submit" variant="primary">Next</Button>
        </div>
      </Form>
    </FormProvider>
  );
}
