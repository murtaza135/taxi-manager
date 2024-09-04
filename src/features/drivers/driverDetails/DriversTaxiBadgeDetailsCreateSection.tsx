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
import { addNewDriverTaxiBadgeSchema, AddNewDriverTaxiBadgeSchema } from '@/features/drivers/addNewDriver/schemas';
import { createObjectTransformer } from '@/utils/transformer';
import { useAttachTaxiBadgeToDriver } from '@/features/drivers/general/hooks/useAttachTaxiBadgeToDriver';

const defaultValues: AddNewDriverTaxiBadgeSchema = {
  badge_number: '',
  badge_start_date: '',
  badge_end_date: '',
  badge_document: undefined,
};

export function DriversTaxiBadgeDetailsCreateSection() {
  const params = useParams();
  const driver_id = Number(params.id);
  const [showForm, setShowForm] = useState<boolean>(false);
  const { mutate: update } = useAttachTaxiBadgeToDriver();

  const form = useZodForm({
    schema: addNewDriverTaxiBadgeSchema,
    defaultValues,
  });

  // @source https://medium.com/@damien_16960/input-file-x-shadcn-x-zod-88f0472c2b81
  const badgeDocumentField = form.registerFileList('badge_document');

  const handleSubmit = form.handleSubmit((data) => {
    const transformedData = createObjectTransformer(data);
    update({ driver_id, ...transformedData });
  });

  return (
    <div className="flex flex-row flex-wrap gap-x-14 gap-y-6">
      <div className="flex flex-col gap-2 items-start py-2">
        <p className="">Add new taxi badge?</p>
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
              name="badge_number"
              render={({ field }) => (
                <FormGroup label="* Badge Number">
                  <Input placeholder="Badge Number" {...field} />
                </FormGroup>
              )}
            />

            <FormField
              control={form.control}
              name="badge_start_date"
              render={({ field }) => (
                <FormGroup label="Start Date">
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
              name="badge_end_date"
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
              name="badge_document"
              render={() => (
                <FormGroup label="Taxi Badge">
                  <Input placeholder="Taxi Badge" type="file" accept="image/*,.pdf" {...badgeDocumentField} />
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