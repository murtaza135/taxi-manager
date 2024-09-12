import { useParams } from 'react-router-dom';
import {
  FormProvider,
  Form,
  FormTitle,
  FormField,
  FormGroup,
  useZodForm,
} from '@/ui/form/Form';
import { Input } from '@/ui/form/Input';
import { Button } from '@/ui/Button';
import { useMultiStepFormContext } from '@/ui/form/MultiStepForm';
import { publicDriverApplicationCompanyDetailsSchema } from '@/features/drivers/publicDriverApplicationForm/schemas';
import { useDriverApplication } from '@/features/drivers/general/hooks/useDriverApplication';
import { capitalizeEachWord } from '@/utils/string/capitalizeEachWord';

export function PublicDriverApplicationCompanyDetailsForm() {
  const application_id = useParams().id as string;
  const { data } = useDriverApplication(application_id);
  const { nextStep } = useMultiStepFormContext();

  const form = useZodForm({
    schema: publicDriverApplicationCompanyDetailsSchema,
    defaultValues: { company_name: data.company_name },
  });

  const handleSubmit = form.handleSubmit(() => {
    nextStep();
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  });

  return (
    <FormProvider {...form}>
      <Form
        onSubmit={handleSubmit}
        className="w-full max-w-[32rem] space-y-4"
      >
        <FormTitle>Company</FormTitle>
        <p className="text-sm">Please make sure the company is correct.</p>

        <FormField
          control={form.control}
          name="company_name"
          render={({ field }) => (
            <FormGroup label="Company Name" className="pointer-events-none">
              <Input
                placeholder="Company Name"
                {...field}
                value={capitalizeEachWord(field.value)}
                readOnly
              />
            </FormGroup>
          )}
        />

        <div className="pt-3 flex justify-end gap-3">
          <Button type="submit" variant="primary">Next</Button>
        </div>
      </Form>
    </FormProvider>
  );
}
