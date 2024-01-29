import { FaUser } from 'react-icons/fa';
import { Button } from '@/ui/Button';
import {
  FormProvider,
  Form,
  FormTitle,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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
        <FormTitle className="text-3xl">Login Forms</FormTitle>
        <FormField
          control={form.control}
          name="username1"
          render={({ field }) => (
            <FormGroup label="Username">
              <Input placeholder="shadcn" {...field} />
            </FormGroup>
          )}
        />
        <FormField
          control={form.control}
          name="username1"
          render={({ field }) => (
            <FormGroup label="Username">
              <Input placeholder="shadcn" {...field} />
            </FormGroup>
          )}
        />
        <div className="flex flex-wrap gap-3">
          <Button variant="default" type="submit" className="flex-grow">Submit</Button>
        </div>
      </Form>
    </FormProvider>
  );
}
