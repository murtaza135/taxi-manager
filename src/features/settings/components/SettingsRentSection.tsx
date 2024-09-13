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
import { useZodForm, FormProvider, FormField, FormGroup } from '@/ui/form/Form';
import { rentDaySchema } from '@/features/settings/schemas';
import { days } from '@/utils/date/days';
import { useSettings } from '@/features/settings/hooks/useSettings';
import { useUpdateSettings } from '@/features/settings/hooks/useUpdateSettings';
import { useToast } from '@/ui/toast';

export function SettingsRentSection() {
  const { data } = useSettings();
  const { mutate: updateSettings } = useUpdateSettings();
  const { toast } = useToast();

  const form = useZodForm({
    schema: rentDaySchema,
    values: data,
  });

  const handleSubmitUpdate = form.handleSubmit((formData) => {
    updateSettings(formData, {
      onSuccess: () => {
        toast({
          title: 'Settings updated',
          description: 'Your settings have successfully been updated',
          variant: 'default',
        });
        form.reset();
      },
    });
  });

  const handleCancelUpdate: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    form.reset(data);
  };

  return (
    <FormProvider {...form}>
      <form
        className="max-w-96 space-y-4"
        onSubmit={handleSubmitUpdate}
      >
        <FormField
          control={form.control}
          name="rent_day"
          render={({ field }) => (
            <FormGroup label="Rent Start Day" className="w-full">
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full border-primary-dark dark:border-primary-light">
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
