import { FaUser } from 'react-icons/fa';
import { Button } from '@/ui/Button';
import {
  FormProvider,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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
      <Form onSubmit={onSubmit} className="w-full max-w-[32rem] space-y-6">
        <FormField
          control={form.control}
          name="username1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username1</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-wrap gap-3">
          <Button variant="default" type="submit">Submit</Button>
          <Button variant="danger" type="button" onClick={() => prevStep()}>Prev</Button>
          <Button variant="outline" type="button">Test1</Button>
        </div>
      </Form>
    </FormProvider>
  );
}
