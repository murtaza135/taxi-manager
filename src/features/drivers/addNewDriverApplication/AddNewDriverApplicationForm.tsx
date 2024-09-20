/* eslint-disable max-len */
import { MdPersonAddAlt1 } from 'react-icons/md';
import { useState } from 'react';
import urlJoin from 'url-join';
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
import { createDriverApplicationSchema, CreateDriverApplicationSchema } from '@/features/drivers/addNewDriverApplication/schemas';
import { useCreateDriverApplication } from '@/features/drivers/general/hooks/useCreateDriverApplication';
import { Separator } from '@/ui/Separator';
import { CopyField } from '@/ui/CopyField';
import { config } from '@/config/config';

const defaultValues: CreateDriverApplicationSchema = {
  name: '',
};

export function AddNewDriverApplicationForm() {
  const { mutateAsync: create, isPending } = useCreateDriverApplication();
  const [newApplicationId, setNewApplicationId] = useState<string>('');

  const link = newApplicationId
    ? urlJoin(config.env.VITE_CLIENT_URL, 'driver-application', newApplicationId)
    : '';

  const isCopyFieldDisbaled = !newApplicationId;

  const form = useZodForm({
    schema: createDriverApplicationSchema,
    defaultValues,
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    const id = await create(data);
    setNewApplicationId(id);
  });

  return (
    <FormProvider {...form}>
      <Form
        onSubmit={handleSubmit}
        className="w-full max-w-[32rem] !flex-grow-0 space-y-4 self-center"
      >
        <FormTitle>Create Application for Driver</FormTitle>
        <p className="text-sm">
          Create a new application and generate a link that you can give to your driver so that he may fill in his details.
        </p>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormGroup label="* Driver Name">
              <div className="flex items-center gap-2">
                <Input placeholder="Driver Name" {...field} />
                <Button type="submit" variant="primary" disabled={isPending}>
                  <MdPersonAddAlt1 className="text-xl" />
                </Button>
              </div>
            </FormGroup>
          )}
        />

        <div className="py-2">
          <Separator className="dark:bg-achromatic-darker" />
        </div>

        <CopyField
          text={link}
          defaultText="Application link not generated yet."
          disabled={isCopyFieldDisbaled}
        />
      </Form>
    </FormProvider>
  );
}
