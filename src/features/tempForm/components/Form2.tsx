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
// import { useMultiStepForm } from '@/features/tempForm/setupForm';
import { useMultiStepForm } from '@/ui/MultiStepForm2';

export function Form2() {
  // const { prevStep, nextStep, updateFormState } = useMultiStepForm();
  const { setStep, setDirection, updateFormState } = useMultiStepForm<FormSchemaType>();

  const form = useZodForm({
    schema: FormSchema2,
    defaultValues: {
      username2: '',
    },
  });

  // const onSubmit = form.handleSubmit((data) => {
  //   console.log(data);
  //   updateFormState(data);
  //   nextStep();
  // });

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
      {/* <Form className="w-full max-w-[32rem] space-y-4"> */}
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
