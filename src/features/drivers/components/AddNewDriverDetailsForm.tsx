import { useRef } from 'react';
import { useForm } from 'react-hook-form';
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
import { addNewDriverDetailsSchema, AddNewDriverDetailsSchema } from '@/features/drivers/schemas';

const defaultValues: AddNewDriverDetailsSchema = {
  first_names: '',
  last_name: '',
};

export function AddNewDriverDetailsForm() {
  const {
    nextStep,
    prevStep,
    updateFormState,
  } = useMultiStepFormContext<AddNewDriverDetailsSchema>();

  const form = useZodForm({
    schema: addNewDriverDetailsSchema,
    defaultValues,
  });

  const handleSubmit = form.handleSubmit((data) => {
    console.log(data);
    updateFormState(data);
    nextStep();
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  });

  const fileRef = form.register('picture');
  const dateRef = form.register('date_of_birth');
  // const ref = useRef<HTMLInputElement>(null);

  return (
    <FormProvider {...form}>
      <Form
        onSubmit={handleSubmit}
        className="w-full max-w-[24rem] space-y-4 bg-primary-dark text-achromatic-lighter"
      >
        <FormTitle>Login</FormTitle>

        <FormField
          control={form.control}
          name="first_names"
          render={({ field }) => (
            <FormGroup label="First Name">
              <Input placeholder="First Name" {...field} />
            </FormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormGroup label="Last Name">
              <Input placeholder="Last Name" {...field} />
            </FormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormGroup label="Email">
              <Input placeholder="Email" type="email" {...field} />
            </FormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormGroup label="Phone Number">
              <Input placeholder="Phone Number" type="tel" {...field} />
            </FormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="national_insurance_number"
          render={({ field }) => (
            <FormGroup label="National Insurance Number">
              <Input placeholder="National Insurance Number" {...field} />
            </FormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="date_of_birth"
          render={({ field }) => (
            <FormGroup label="Date of Birth">
              <Input placeholder="Date of Birth" type="date" {...dateRef} />
            </FormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="picture"
          render={({ field }) => (
            <FormGroup label="Picture">
              <Input
                placeholder="Picture"
                type="file"
                // {...field}
                // onChange={(event) => {
                //   console.log(event.target.files);
                //   field.onChange(event.target?.files?.[0] ?? undefined);
                // }}
                {...fileRef}
              />
            </FormGroup>
          )}
        />

        <div className="pt-3 flex justify-end">
          <Button type="submit" variant="base">Next</Button>
        </div>
      </Form>
    </FormProvider>
  );
}
