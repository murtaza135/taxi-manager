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
import { FormSchema2, FormSchemaType } from '@/features/tempForm/schema';
import { useMultiStepFormContext } from '@/ui/MultiStepForm';

export function Form2() {
  const { setStep, setDirection, updateFormState } = useMultiStepFormContext<FormSchemaType>();

  const form = useZodForm({
    schema: FormSchema2,
    defaultValues: {
      username2: '',
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
    updateFormState(data);
    setStep((step) => step + 1);
    setDirection('forwards');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  });

  const prevStep = () => {
    setStep((step) => step - 1);
    setDirection('backwards');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const nextStep = () => {
    setStep((step) => step + 1);
    setDirection('forwards');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

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
