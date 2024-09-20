import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { BoxSwitch } from '@/ui/BoxSwitch';
import {
  FormProvider,
  Form,
  FormField,
  FormGroup,
  useZodForm,
} from '@/ui/form/Form';
import { Input } from '@/ui/form/Input';
import { Button } from '@/ui/Button';
import { addNewTaxiInsuranceSchema, AddNewTaxiInsuranceSchema } from '@/features/taxis/addNewTaxi/schemas';
import { createObjectTransformer } from '@/utils/transformer';
import { useAttachInsuranceToTaxi } from '@/features/taxis/general/hooks/useAttachInsuranceToTaxi';
import { Dropzone } from '@/ui/form/Dropzone';

const defaultValues: AddNewTaxiInsuranceSchema = {
  policy_number: '',
  is_any_driver: true,
  insurance_start_date: '',
  insurance_end_date: '',
  insurance_document_path: undefined,
};

export function TaxiInsuranceDetailsCreateSection() {
  const params = useParams();
  const taxi_id = Number(params.id);
  const [showForm, setShowForm] = useState<boolean>(false);
  const { mutate: update } = useAttachInsuranceToTaxi();

  const form = useZodForm({
    schema: addNewTaxiInsuranceSchema,
    defaultValues,
  });

  const handleSubmit = form.handleSubmit((data) => {
    const transformedData = createObjectTransformer(data);
    update({ taxi_id, ...transformedData });
  });

  return (
    <div className="flex flex-row flex-wrap gap-x-14 gap-y-6">
      <div className="flex flex-col gap-2 items-start py-2">
        <p className="">Add new insurance details?</p>
        <BoxSwitch value={showForm} onValueChange={setShowForm} />
      </div>

      {showForm && (
        <FormProvider {...form}>
          <Form
            onSubmit={handleSubmit}
            className="px-0 pt-2 pb-4 w-full max-w-[32rem] space-y-4 border-primary-dark dark:border-primary-light"
          >
            <FormField
              control={form.control}
              name="policy_number"
              render={({ field }) => (
                <FormGroup label="* Policy Number">
                  <Input placeholder="Policy Number" {...field} />
                </FormGroup>
              )}
            />

            <FormField
              control={form.control}
              name="insurance_start_date"
              render={({ field }) => (
                <FormGroup label="* Start Date">
                  <Input
                    placeholder="Start Date"
                    type="date"
                    onFocus={(event) => event.target.showPicker()}
                    {...field}
                  />
                </FormGroup>
              )}
            />

            <FormField
              control={form.control}
              name="insurance_end_date"
              render={({ field }) => (
                <FormGroup label="* End Date">
                  <Input
                    placeholder="End Date"
                    type="date"
                    onFocus={(event) => event.target.showPicker()}
                    {...field}
                  />
                </FormGroup>
              )}
            />

            <FormField
              control={form.control}
              name="insurance_document_path"
              render={({ field }) => (
                <FormGroup label="Insurance Document">
                  <Dropzone
                    defaultValue={field.value}
                    onChange={field.onChange}
                    onReset={() => form.resetField(field.name)}
                    accept="image/*,.pdf"
                  />
                </FormGroup>
              )}
            />

            <div className="pt-3 flex justify-end gap-3 flex-wrap-reverse">
              <Button type="submit" variant="primary">Submit</Button>
            </div>
          </Form>
        </FormProvider>
      )}
    </div>
  );
}
