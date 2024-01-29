import { Button } from '@/ui/Button';
import {
  FormProvider,
  Form,
  FormField,
  useZodForm,
  FormGroup,
  FormTitle,
} from '@/ui/Form';
import { Input } from '@/ui/Input';
import { FormSchema2 } from '@/features/tempForm/schema';
import { useMultiStepForm } from '@/features/tempForm/setupForm';

export function Form2() {
  const { prevStep, nextStep, updateFormState } = useMultiStepForm();

  const form = useZodForm({
    schema: FormSchema2,
    defaultValues: {
      username2: '',
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
    updateFormState(data);
    nextStep();
  });

  return (
    <FormProvider {...form}>
      <Form onSubmit={onSubmit} className="w-full max-w-[32rem] space-y-4">
        <FormTitle>User Form</FormTitle>

        <FormField
          control={form.control}
          name="username2"
          render={({ field }) => (
            <FormGroup label="Username 2">
              <Input placeholder="Username 2" {...field} />
            </FormGroup>
          )}
        />

        <div className="flex flex-wrap gap-3">
          <Button type="submit">Submit</Button>
          <Button type="button" onClick={() => prevStep()}>Prev</Button>
          <Button type="button" onClick={() => nextStep()}>Next</Button>
        </div>
      </Form>
    </FormProvider>
  );
}
