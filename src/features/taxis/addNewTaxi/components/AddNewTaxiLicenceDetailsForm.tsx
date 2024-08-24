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
import { addNewTaxiLicenceDetailsSchema, AddNewTaxiLicenceDetailsSchema } from '@/features/taxis/addNewTaxi/schemas';

export function AddNewTaxiLicenceDetailsForm() {
  const {
    formState,
    nextStep,
    prevStep,
    updateFormState,
  } = useMultiStepFormContext<AddNewTaxiLicenceDetailsSchema>();

  const form = useZodForm({
    schema: addNewTaxiLicenceDetailsSchema,
    defaultValues: formState,
  });

  // @source https://medium.com/@damien_16960/input-file-x-shadcn-x-zod-88f0472c2b81
  const complianceCertificateField = form.registerFileList('compliance_certificate_document_path');
  const phcLicenceField = form.registerFileList('phc_licence_document_path');

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
        <FormTitle>Taxi Licence</FormTitle>

        <FormField
          control={form.control}
          name="phc_number"
          render={({ field }) => (
            <FormGroup label="* PHC Number">
              <Input placeholder="PH1234" className="[&>input]:uppercase [&>input]:placeholder:normal-case" {...field} />
            </FormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="compliance_certificate_licence_number"
          render={({ field }) => (
            <FormGroup label="* Compliance Certificate Licence Number">
              <Input placeholder="Compliance Certificate Licence Number" {...field} />
            </FormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="taxi_licence_start_date"
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
          name="taxi_licence_end_date"
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
          name="compliance_certificate_document_path"
          render={() => (
            <FormGroup label="Compliance Certificate">
              <Input placeholder="Compliance Certificate" type="file" accept="image/*,.pdf" {...complianceCertificateField} />
            </FormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="phc_licence_document_path"
          render={() => (
            <FormGroup label="PHC Licence (Red Letter)">
              <Input placeholder="PHC Licence (Red Letter)" type="file" accept="image/*,.pdf" {...phcLicenceField} />
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
