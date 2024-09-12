import { IoIosWarning } from 'react-icons/io';
import { useState } from 'react';
import { Input } from '@/ui/form/Input';
import { Button } from '@/ui/Button';
import { useChangeEmail } from '@/features/auth/hooks/useChangeEmail';
import { useZodForm, FormProvider, FormField, FormGroup } from '@/ui/form/Form';
import { changeEmailSchema } from '@/features/settings/schemas';
import { useSession } from '@/features/auth/hooks/useSession';

export function SettingsChangeEmailSection() {
  const { data } = useSession();
  const { email = '' } = data.user;
  const { mutateAsync: changeEmail } = useChangeEmail();
  const [hasSubmittedChange, setHasSubmittedChange] = useState<boolean>(false);

  const form = useZodForm({
    schema: changeEmailSchema,
    values: { email },
  });

  const handleSubmitUpdate = form.handleSubmit(async (formData) => {
    await changeEmail(formData.email);
    setHasSubmittedChange(true);
  });

  return (
    <FormProvider {...form}>
      <form
        className="max-w-96 space-y-4"
        onSubmit={handleSubmitUpdate}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormGroup label="Email" className="w-full">
              <div className="w-full flex items-center gap-2">
                <Input placeholder="Email" {...field} />
                <Button type="submit" variant="primary" className="">Submit</Button>
              </div>
            </FormGroup>
          )}
        />

        {hasSubmittedChange && (
          <div className="flex gap-2 border bg-yellow-300/50 border-yellow-500 text-achromatic-dark dark:bg-yellow-700/30 dark:text-achromatic-lighter dark:border-yellow-500 rounded-lg px-3 py-2 text-sm">
            <IoIosWarning className="shrink-0 translate-y-[0.19rem] text-yellow-500 dark:text-yellow-500" />
            <p>Please go to your new email and confirm any changes.</p>
          </div>
        )}
      </form>
    </FormProvider>
  );
}
