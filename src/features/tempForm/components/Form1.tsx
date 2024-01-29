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
import { FormSchema1 } from '@/features/tempForm/schema';
import { useMultiStepForm } from '@/features/tempForm/setupForm';

export function Form1() {
  const { prevStep, nextStep, updateFormState } = useMultiStepForm();

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
  });

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

        <div className="flex flex-wrap gap-3">
          <Button variant="default" type="submit">Submit</Button>
          <Button type="button" onClick={() => prevStep()}>Prev</Button>
          <Button type="button" onClick={() => nextStep()}>Next</Button>
        </div>
      </Form>
    </FormProvider>
  );
}
