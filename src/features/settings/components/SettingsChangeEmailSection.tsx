import { IoIosWarning } from 'react-icons/io';
import { useState } from 'react';
import { Input } from '@/ui/form/Input';
import { Button } from '@/ui/Button';
import { useChangeEmail } from '@/features/auth/hooks/useChangeEmail';
import { useZodForm, FormProvider, FormField, FormGroup } from '@/ui/form/Form';
import { changeEmailSchema } from '@/features/settings/schemas';
import { useSession } from '@/features/auth/hooks/useSession';
import { Separator } from '@/ui/Separator';

export function SettingsChangeEmailSection() {
  const { data } = useSession();
  const { email = '' } = data.user;
  const { mutateAsync: changeEmail } = useChangeEmail();
  const [hasSubmittedChange, setHasSubmittedChange] = useState<boolean>(false);

  const form = useZodForm({
    schema: changeEmailSchema,
    defaultValues: { email },
  });

  const handleSubmitUpdate = form.handleSubmit(async (formData) => {
    await changeEmail(formData.email);
    setHasSubmittedChange(true);
  });

  const handleCancelUpdate: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    form.reset({ email });
  };

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
              <Input type="email" placeholder="Email" {...field} />
            </FormGroup>
          )}
        />

        {hasSubmittedChange && (
          <div className="flex gap-2 border bg-yellow-300/50 border-yellow-500 text-achromatic-dark dark:bg-yellow-700/30 dark:text-achromatic-lighter dark:border-yellow-500 rounded-lg px-3 py-2 text-sm">
            <IoIosWarning className="shrink-0 translate-y-[0.19rem] text-yellow-500 dark:text-yellow-500" />
            <p>Please go to your new email and confirm any changes.</p>
          </div>
        )}

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
