import { Link, useNavigate } from 'react-router-dom';
import { useMultiStepFormContext } from '@/ui/form/MultiStepForm';
import { Button } from '@/ui/Button';
import { Separator } from '@/ui/Separator';
import { addNewTaxiSchema, AddNewTaxiSchema, addNewTaxiTransformer } from '@/features/taxis/addNewTaxi/schemas';
import { useZodForm, FormProvider, Form, FormTitle, FormSection, FormField } from '@/ui/form/Form';
import { ReadOnlyInput } from '@/ui/form/Input';
import { useToast } from '@/ui/toast';
import { useAddNewTaxi } from '@/features/taxis/general/hooks/useAddNewTaxi';
import { Dropzone } from '@/ui/form/Dropzone';

export function AddNewTaxiFormConfirmation() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { mutate: addNewTaxi } = useAddNewTaxi();

  const {
    formState,
    prevStep,
    setStep,
  } = useMultiStepFormContext<AddNewTaxiSchema>();

  const form = useZodForm({
    schema: addNewTaxiSchema,
    defaultValues: formState,
    shouldFocusError: false,
  });

  const handleSubmit = form.handleSubmit(
    (data) => {
      const transformedData = addNewTaxiTransformer(data);
      addNewTaxi(transformedData, {
        onSuccess: (id) => navigate(`/taxi/${id}`, { preventScrollReset: false }),
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
              <ReadOnlyInput title="Number Plate" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="make"
            render={({ field }) => (
              <ReadOnlyInput title="Make" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <ReadOnlyInput title="Model" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="colour"
            render={({ field }) => (
              <ReadOnlyInput title="Colour" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="chassis_number"
            render={({ field }) => (
              <ReadOnlyInput title="Chassis Number" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="registration_date"
            render={({ field }) => (
              <ReadOnlyInput title="Vehicle Registration Date" type="date" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="expected_expiry_date"
            render={({ field }) => (
              <ReadOnlyInput title="Expected Vehicle Expiry" type="date" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="road_tax_expiry_date"
            render={({ field }) => (
              <ReadOnlyInput title="Road Tax Expiry" type="date" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="cc"
            render={({ field }) => (
              <ReadOnlyInput title="CC" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="fuel_type"
            render={({ field }) => (
              <ReadOnlyInput title="Fuel Type" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="picture_path"
            render={({ field }) => (
              <div>
                <p className="font-bold">Taxi Picture</p>
                <Dropzone
                  defaultValue={field.value}
                  onChange={field.onChange}
                  onReset={() => form.resetField(field.name)}
                  accept="image/*"
                  disabled
                />
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="logbook_document_path"
            render={({ field }) => (
              <div>
                <p className="font-bold">Logbook (Front)</p>
                <Dropzone
                  defaultValue={field.value}
                  onChange={field.onChange}
                  onReset={() => form.resetField(field.name)}
                  accept="image/*,.pdf"
                  disabled
                />
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="logbook_document2_path"
            render={({ field }) => (
              <div>
                <p className="font-bold">Logbook (Back)</p>
                <Dropzone
                  defaultValue={field.value}
                  onChange={field.onChange}
                  onReset={() => form.resetField(field.name)}
                  accept="image/*,.pdf"
                  disabled
                />
              </div>
            )}
          />
        </FormSection>

        <FormSection title="Taxi Licence" onEdit={() => setStep(2)}>
          <FormField
            control={form.control}
            name="phc_number"
            render={({ field }) => (
              <ReadOnlyInput title="PHC Number" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="compliance_certificate_licence_number"
            render={({ field }) => (
              <ReadOnlyInput title="Compliance Certificate Licence Number" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="taxi_licence_start_date"
            render={({ field }) => (
              <ReadOnlyInput title="Start Date" type="date" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="taxi_licence_end_date"
            render={({ field }) => (
              <ReadOnlyInput title="End Date" type="date" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="compliance_certificate_document_path"
            render={({ field }) => (
              <div>
                <p className="font-bold">Compliance Certificate</p>
                <Dropzone
                  defaultValue={field.value}
                  onChange={field.onChange}
                  onReset={() => form.resetField(field.name)}
                  accept="image/*,.pdf"
                  disabled
                />
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="phc_licence_document_path"
            render={({ field }) => (
              <div>
                <p className="font-bold">PHC Licence (Red Letter)</p>
                <Dropzone
                  defaultValue={field.value}
                  onChange={field.onChange}
                  onReset={() => form.resetField(field.name)}
                  accept="image/*,.pdf"
                  disabled
                />
              </div>
            )}
          />
        </FormSection>

        <FormSection title="Insurance" onEdit={() => setStep(3)}>
          <FormField
            control={form.control}
            name="policy_number"
            render={({ field }) => (
              <ReadOnlyInput title="Policy Number" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="is_any_driver"
            render={({ field: { value, ...rest } }) => (
              <ReadOnlyInput title="Any Driver?" {...rest} value={value ? 'Yes' : 'No'} />
            )}
          />

          <FormField
            control={form.control}
            name="insurance_start_date"
            render={({ field }) => (
              <ReadOnlyInput title="Start Date" type="date" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="insurance_end_date"
            render={({ field }) => (
              <ReadOnlyInput title="End Date" type="date" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="insurance_document_path"
            render={({ field }) => (
              <div>
                <p className="font-bold">Insurance Document</p>
                <Dropzone
                  defaultValue={field.value}
                  onChange={field.onChange}
                  onReset={() => form.resetField(field.name)}
                  accept="image/*,.pdf"
                  disabled
                />
              </div>
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
