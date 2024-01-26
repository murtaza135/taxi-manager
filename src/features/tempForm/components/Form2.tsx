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
import { FormSchema2 } from '@/features/tempForm/schema';
import { useMultiStepForm } from '@/features/tempForm/setupForm';

export function Form2() {
  const { nextStep, updateFormState } = useMultiStepForm();

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
      <Form onSubmit={onSubmit} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="username2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username2</FormLabel>
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
        <Button type="submit">Submit</Button>
        <Button type="button" onClick={() => nextStep()}>Next</Button>
      </Form>
    </FormProvider>
  );
}
