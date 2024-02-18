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
import { FormSchema3, FormSchemaType } from '@/features/tempForm/schema';
import { useMultiStepFormContext } from '@/ui/MultiStepForm';

export function Form3() {
  const { setStep, setDirection, updateFormState } = useMultiStepFormContext<FormSchemaType>();

  const form = useZodForm({
    schema: FormSchema3,
    defaultValues: {
      username3: '',
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
    updateFormState(data);
    setStep((step) => step + 1);
    setDirection('forwards');
  });

  const prevStep = () => {
    setStep((step) => step - 1);
    setDirection('backwards');
  };

  const nextStep = () => {
    setStep((step) => step + 1);
    setDirection('forwards');
  };

  return (
    <FormProvider {...form}>
      <Form onSubmit={onSubmit} className="w-full max-w-[32rem] space-y-4">
        <FormTitle>User Form</FormTitle>

        <FormField
          control={form.control}
          name="username3"
          render={({ field }) => (
            <FormGroup label="Username 3">
              <Input placeholder="Username 3" {...field} />
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
