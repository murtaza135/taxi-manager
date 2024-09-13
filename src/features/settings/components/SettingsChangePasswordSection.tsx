import { Input } from '@/ui/form/Input';
import { Button } from '@/ui/Button';
import { useChangePassword } from '@/features/auth/hooks/useChangePassword';
import { useZodForm, FormProvider, FormField, FormGroup } from '@/ui/form/Form';
import { changePasswordSchema, ChangePasswordSchema } from '@/features/settings/schemas';
import { useToast } from '@/ui/toast';
import { Separator } from '@/ui/Separator';

const defaultValues: ChangePasswordSchema = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};

export function SettingsChangePasswordSection() {
  const { mutate: changePassword } = useChangePassword();
  const { toast } = useToast();

  const form = useZodForm({
    schema: changePasswordSchema,
    defaultValues,
  });

  const handleSubmitUpdate = form.handleSubmit((formData) => {
    changePassword(formData, {
      onSuccess: () => {
        toast({
          title: 'Password Updated',
          description: 'Your password has successfully been updated',
          variant: 'default',
        });
        form.reset();
      },
    });
  });

  const handleCancelUpdate: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    form.reset(defaultValues);
  };

  return (
    <FormProvider {...form}>
      <form
        className="max-w-96 space-y-4"
        onSubmit={handleSubmitUpdate}
      >
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormGroup label="Old Password" className="w-full">
              <Input type="password" placeholder="Old Password" {...field} />
            </FormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormGroup label="New Password" className="w-full">
              <Input type="password" placeholder="New Password" {...field} />
            </FormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormGroup label="Confirm New Password" className="w-full">
              <Input type="password" placeholder="Confirm New Password" {...field} />
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
