import { Link, useNavigate } from 'react-router-dom';
import { useMultiStepFormContext } from '@/ui/form/MultiStepForm';
import { Button } from '@/ui/Button';
import { Separator } from '@/ui/Separator';
import { addNewRentSchema, AddNewRentSchema, addNewRentTransformer } from '@/features/rent/addNewRent/schemas';
import { useZodForm, FormProvider, Form, FormTitle, FormSection, FormField } from '@/ui/form/Form';
import { ReadOnlyInput } from '@/ui/form/Input';
import { useToast } from '@/ui/toast';
import { useAddNewRent, AddNewRentFormData } from '@/features/rent/general/hooks/useAddNewRent';
import { toDateInputString } from '@/utils/date/toDateInputString';

export function AddNewRentConfirmationForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { mutate: addNewRent } = useAddNewRent();

  const {
    formState,
    prevStep,
    setStep,
  } = useMultiStepFormContext<AddNewRentSchema>();

  const form = useZodForm({
    schema: addNewRentSchema,
    defaultValues: formState,
    shouldFocusError: false,
  });

  const handleSubmit = form.handleSubmit(
    (data) => {
      const transformedData = addNewRentTransformer(data);
      const formData: AddNewRentFormData = {
        hire_id: transformedData.hire_id,
        amount: transformedData.amount,
        start_date: transformedData.start_date,
        end_date: transformedData.end_date,
      };

      addNewRent(formData, {
        onSuccess: (id) => navigate(`/rent/${id}`, { preventScrollReset: false }),
      });
    },
    () => {
      toast({
        title: 'Something went wrong',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    },
  );

  const goPrevStep = () => {
    prevStep();
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  return (
    <FormProvider {...form}>
      <Form
        onSubmit={handleSubmit}
        className="w-full max-w-[32rem] space-y-8"
      >
        <FormTitle>Confirmation</FormTitle>

        <FormSection title="Hire Agreement" onEdit={() => setStep(1)}>
          <FormField
            control={form.control}
            name="hire_id"
            render={({ field }) => (
              <ReadOnlyInput title="Hire ID" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="taxi_number_plate"
            render={({ field }) => (
              <ReadOnlyInput title="Number Plate" className="uppercase" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="taxi_licence_phc_number"
            render={({ field }) => (
              <ReadOnlyInput title="PH Number" className="uppercase" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="driver_name"
            render={({ field }) => (
              <ReadOnlyInput title="Driver" className="capitalize" {...field} />
            )}
          />
        </FormSection>

        <FormSection title="Driver" onEdit={() => setStep(2)}>
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <ReadOnlyInput title="Rent Amount" {...field} value={`£${field.value}`} />
            )}
          />

          <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
              <ReadOnlyInput type="date" title="Start Date" {...field} value={toDateInputString(new Date(field.value))} />
            )}
          />

          <FormField
            control={form.control}
            name="end_date"
            render={({ field }) => (
              <ReadOnlyInput type="date" title="End Date" {...field} value={toDateInputString(new Date(field.value))} />
            )}
          />
        </FormSection>

        <Separator className="bg-primary-dark dark:bg-primary-light" />

        <div className="pt-3 flex justify-between gap-3 flex-wrap-reverse">
          <Button type="button" variant="outline" onClick={goPrevStep}>Back</Button>
          <div className="flex gap-3 flex-wrap-reverse">
            <Link to="/taxis">
              <Button type="button" variant="danger">Cancel</Button>
            </Link>
            <Button type="submit" variant="primary">Submit</Button>
          </div>
        </div>
      </Form>
    </FormProvider>
  );
}
