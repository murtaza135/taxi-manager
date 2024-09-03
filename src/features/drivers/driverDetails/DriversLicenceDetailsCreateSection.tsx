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
import { addNewDriversLicenceSchema, AddNewDriversLicenceSchema } from '@/features/drivers/addNewDriver/schemas';
import { createObjectTransformer } from '@/utils/transformer';
import { useAttachLicenceToDriver } from '@/features/drivers/general/hooks/useAttachLicenceToDriver';

const defaultValues: AddNewDriversLicenceSchema = {
  licence_number: '',
  licence_start_date: '',
  licence_end_date: '',
  licence_document: undefined,
};

export function DriversLicenceDetailsCreateSection() {
  const params = useParams();
  const driver_id = Number(params.id);
  const [showForm, setShowForm] = useState<boolean>(false);
  const { mutate: update } = useAttachLicenceToDriver();

  const form = useZodForm({
    schema: addNewDriversLicenceSchema,
    defaultValues,
  });

  // @source https://medium.com/@damien_16960/input-file-x-shadcn-x-zod-88f0472c2b81
  const licenceDocumentField = form.registerFileList('licence_document');

  const handleSubmit = form.handleSubmit((data) => {
    const transformedData = createObjectTransformer(data);
    update({ driver_id, ...transformedData });
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
              name="licence_number"
              render={({ field }) => (
                <FormGroup label="* Licence Number">
                  <Input placeholder="Licence Number" {...field} />
                </FormGroup>
              )}
            />

            <FormField
              control={form.control}
              name="licence_start_date"
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
              name="licence_end_date"
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
              name="licence_document"
              render={() => (
                <FormGroup label="Drivers Licence">
                  <Input placeholder="Drivers Licence" type="file" accept="image/*,.pdf" {...licenceDocumentField} />
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
