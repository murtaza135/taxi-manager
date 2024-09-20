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
import { addNewTaxiInsuranceSchema, AddNewTaxiInsuranceSchema } from '@/features/taxis/addNewTaxi/schemas';
import { Dropzone } from '@/ui/form/Dropzone';

export function AddNewTaxiInsuranceForm() {
  const {
    formState,
    nextStep,
    prevStep,
    updateFormState,
  } = useMultiStepFormContext<AddNewTaxiInsuranceSchema>();

  const form = useZodForm({
    schema: addNewTaxiInsuranceSchema,
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
        <FormTitle>Insurance</FormTitle>

        <FormField
          control={form.control}
          name="policy_number"
          render={({ field }) => (
            <FormGroup label="* Policy Number">
              <Input placeholder="Policy Number" {...field} />
            </FormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="insurance_start_date"
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
          name="insurance_end_date"
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
          name="insurance_document_path"
          render={({ field }) => (
            <FormGroup label="Insurance Documente">
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
          <div className="flex gap-3 flex-wrap-reverse">
            <Button type="button" variant="outline" onClick={goNextStep}>Skip</Button>
            <Button type="submit" variant="primary">Next</Button>
          </div>
        </div>
      </Form>
    </FormProvider>
  );
}
