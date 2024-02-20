import { Button } from '@/ui/Button';
import {
  FormProvider,
  Form,
  FormTitle,
  FormField,
  FormGroup,
  useZodForm,
} from '@/ui/Form';
import { Input } from '@/ui/Input';
import { FormSchema1, FormSchemaType } from '@/features/tempForm/schema';
import { useMultiStepFormContext } from '@/ui/MultiStepForm';

export function Form1() {
  const { nextStep, prevStep, updateFormState } = useMultiStepFormContext<FormSchemaType>();

  const form = useZodForm({
    schema: FormSchema1,
    defaultValues: {
      username1: '',
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
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
      <Form onSubmit={onSubmit} className="w-full max-w-[32rem] space-y-4">
        <FormTitle>User Form</FormTitle>

        <FormField
          control={form.control}
          name="username1"
          render={({ field }) => (
            <FormGroup label="Username 1">
              <Input placeholder="Username 1" {...field} />
            </FormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="username1"
          render={({ field }) => (
            <FormGroup label="Username 1">
              <Input placeholder="Username 1" {...field} />
            </FormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="username1"
          render={({ field }) => (
            <FormGroup label="Username 1">
              <Input placeholder="Username 1" {...field} />
            </FormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="username1"
          render={({ field }) => (
            <FormGroup label="Username 1">
              <Input placeholder="Username 1" {...field} />
            </FormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="username1"
          render={({ field }) => (
            <FormGroup label="Username 1">
              <Input placeholder="Username 1" {...field} />
            </FormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="username1"
          render={({ field }) => (
            <FormGroup label="Username 1">
              <Input placeholder="Username 1" {...field} />
            </FormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="username1"
          render={({ field }) => (
            <FormGroup label="Username 1">
              <Input placeholder="Username 1" {...field} />
            </FormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="username1"
          render={({ field }) => (
            <FormGroup label="Username 1">
              <Input placeholder="Username 1" {...field} />
            </FormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="username1"
          render={({ field }) => (
            <FormGroup label="Username 1">
              <Input placeholder="Username 1" {...field} />
            </FormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="username1"
          render={({ field }) => (
            <FormGroup label="Username 1">
              <Input placeholder="Username 1" {...field} />
            </FormGroup>
          )}
        />

        <div className="flex flex-wrap gap-3">
          <Button type="submit">Submit</Button>
          <Button type="button" onClick={() => goPrevStep()}>Prev</Button>
          <Button type="button" onClick={() => goNextStep()}>Next</Button>
        </div>
      </Form>
    </FormProvider>
  );
}
