import { IoIosWarning } from 'react-icons/io';
import { useState } from 'react';
import { capitalCase } from 'change-case';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/Select';
import { Separator } from '@/ui/Separator';
import { Button } from '@/ui/Button';
import { Input } from '@/ui/form/Input';
// import { useChangeEmail } from '@/features/auth/hooks/useChangeEmail';
import { useZodForm, FormProvider, FormField, FormGroup } from '@/ui/form/Form';
import { daySchema, days } from '@/features/settings/schemas';
// import { useSession } from '@/features/auth/hooks/useSession';

export function SettingsRentSection() {
  // const { data } = useSession();
  // const { email = '' } = data.user;
  // const { mutateAsync: changeEmail } = useChangeEmail();

  const form = useZodForm({
    schema: daySchema,
  });

  const handleSubmitUpdate = form.handleSubmit(async (formData) => {
    console.log(formData);
    // await changeEmail(formData.email);
  });

  const handleCancelUpdate: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    form.reset();
  };

  return (
    <FormProvider {...form}>
      <form
        className="max-w-96 space-y-4"
        onSubmit={handleSubmitUpdate}
      >
        <FormField
          control={form.control}
          name="day"
          render={({ field }) => (
            <FormGroup label="Rent Start Day" className="w-full">
              <Select onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Please select the day the rent is to start" />
                </SelectTrigger>
                <SelectContent>
                  {days.map((day) => (
                    <SelectItem key={day} value={day}>{capitalCase(day)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormGroup>
          )}
        />

        <div className="space-y-2.5 pt-1">
          <Separator className="h-[1px] bg-achromatic-light dark:bg-achromatic-darker" />
          <div className="flex items-center justify-end gap-2">
            <Button type="button" variant="danger" onClick={handleCancelUpdate}>Cancel</Button>
            <Button type="submit" variant="primary">Save</Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
