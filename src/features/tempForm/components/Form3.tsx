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
import { FormSchema3 } from '@/features/tempForm/schema';
import { useMultiStepForm } from '@/features/tempForm/setupForm';

export function Form3() {
  const { nextStep, updateFormState } = useMultiStepForm();

  const form = useZodForm({
    schema: FormSchema3,
    defaultValues: {
      username3: '',
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
    updateFormState(data);
    // nextStep();
    console.log('complete');
  });

  return (
    <FormProvider {...form}>
      <Form onSubmit={onSubmit} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="username3"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username3</FormLabel>
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
