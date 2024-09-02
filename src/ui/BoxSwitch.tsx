import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Label } from '@/ui/form/Label';

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>((props, ref) => (
  <RadioGroupPrimitive.Root
    {...props}
    ref={ref}
  />
));
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>((props, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    {...props}
  >
    <RadioGroupPrimitive.Indicator>
      <Circle />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
));
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

const BoxSwitch = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, value, defaultValue, onValueChange, ...props }, ref) => {
  const yesId = React.useId();
  const noId = React.useId();
  const [innerValue, setInnerValue] = React.useState<string>(value ?? defaultValue ?? 'no');
  const actualValue = value ?? innerValue;

  const handleValueChange = (val: string) => {
    setInnerValue(val);
    onValueChange?.(val);
  };

  return (
    <RadioGroup
      value={actualValue}
      {...props}
      ref={ref}
      className={cn('flex rounded-lg w-fit border border-primary-dark dark:border-achromatic-dark overflow-hidden', className)}
      onValueChange={handleValueChange}
    >
      <div>
        <RadioGroupItem value="no" id={noId} className="hidden" />
        <Label
          className={cn('inline-block px-6 py-4 w-full h-full cursor-pointer text-primary-dark dark:text-achromatic-lighter', actualValue === 'no' && 'bg-primary-dark text-achromatic-lighter dark:bg-achromatic-dark', actualValue === 'yes' && 'hover:opacity-75')}
          htmlFor={noId}
        >
          No
        </Label>
      </div>

      <div className="w-[1px] bg-primary-dark dark:bg-achromatic-dark" />

      <div>
        <RadioGroupItem value="yes" id={yesId} className="hidden" />
        <Label
          className={cn('inline-block px-6 py-4 w-full h-full cursor-pointer text-primary-dark dark:text-achromatic-lighter', actualValue === 'yes' && 'bg-primary-dark text-achromatic-lighter dark:bg-achromatic-dark', actualValue === 'no' && 'hover:opacity-75')}
          htmlFor={yesId}
        >
          Yes
        </Label>
      </div>
    </RadioGroup>
  );
});
BoxSwitch.displayName = 'BoxSwitch';

export { BoxSwitch };
