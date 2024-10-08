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
import { addNewTaxiDetailsSchema, AddNewTaxiDetailsSchema } from '@/features/taxis/addNewTaxi/schemas';
import { Dropzone } from '@/ui/form/Dropzone';

export function AddNewTaxiDetailsForm() {
  const {
    formState,
    nextStep,
    updateFormState,
  } = useMultiStepFormContext<AddNewTaxiDetailsSchema>();

  const form = useZodForm({
    schema: addNewTaxiDetailsSchema,
    defaultValues: formState,
  });

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
        <FormTitle>Taxi</FormTitle>

        <FormField
          control={form.control}
          name="number_plate"
          render={({ field }) => (
            <FormGroup label="* Number Plate">
              <Input placeholder="Number Plate" className="[&>input]:uppercase [&>input]:placeholder:normal-case" {...field} />
            </FormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="make"
          render={({ field }) => (
            <FormGroup label="* Make">
              <Input placeholder="Make" {...field} />
            </FormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormGroup label="* Model">
              <Input placeholder="Model" {...field} />
            </FormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="colour"
          render={({ field }) => (
            <FormGroup label="* Colour">
              <Input placeholder="Colour" {...field} />
            </FormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="chassis_number"
          render={({ field }) => (
            <FormGroup label="* Chassis Number">
              <Input placeholder="Chassis Number" className="[&>input]:uppercase [&>input]:placeholder:normal-case" {...field} />
            </FormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="registration_date"
          render={({ field }) => (
            <FormGroup label="Vehicle Registration Date">
              <Input
                placeholder="Vehicle Registration Date"
                type="date"
                onFocus={(event) => event.target.showPicker()}
                {...field}
              />
            </FormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="expected_expiry_date"
          render={({ field }) => (
            <FormGroup label="Expected Vehicle Expiry">
              <Input
                placeholder="Expected Vehicle Expiry"
                type="date"
                onFocus={(event) => event.target.showPicker()}
                {...field}
              />
            </FormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="road_tax_expiry_date"
          render={({ field }) => (
            <FormGroup label="Road Tax Expiry">
              <Input
                placeholder="Road Tax Expiry"
                type="date"
                onFocus={(event) => event.target.showPicker()}
                {...field}
              />
            </FormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="cc"
          render={({ field }) => (
            <FormGroup label="CC">
              <Input placeholder="CC" {...field} />
            </FormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="fuel_type"
          render={({ field }) => (
            <FormGroup label="Fuel Type">
              <Input placeholder="Fuel Type" {...field} />
            </FormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="picture_path"
          render={({ field }) => (
            <FormGroup label="Taxi Picture">
              <Dropzone
                defaultValue={field.value}
                onChange={field.onChange}
                onReset={() => form.resetField(field.name)}
                accept="image/*"
              />
            </FormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="logbook_document_path"
          render={({ field }) => (
            <FormGroup label="Logbook (Front)">
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
          name="logbook_document2_path"
          render={({ field }) => (
            <FormGroup label="Logbook (Back)">
              <Dropzone
                defaultValue={field.value}
                onChange={field.onChange}
                onReset={() => form.resetField(field.name)}
                accept="image/*,.pdf"
              />
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
