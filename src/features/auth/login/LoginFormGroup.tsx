import { useFormField, FormItem, FormControl, FormLabel, FormDescription, FormMessage } from '@/ui/form/Form';
import { cn } from '@/utils/cn';

type Props = {
  label?: string;
  description?: string;
  children: React.ReactNode;
};

export function LoginFormGroup({ label, description, children }: Props) {
  const { error } = useFormField();

  return (
    <FormItem>
      {!!label && <FormLabel>{label}</FormLabel>}
      <FormControl className={cn(error && 'border-2')}>{children}</FormControl>
      {!!description && <FormDescription className="text-achromatic-lighter">{description}</FormDescription>}
      <FormMessage className="text-red-200" />
    </FormItem>
  );
}
