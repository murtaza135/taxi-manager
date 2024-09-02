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

type BoxSwitchProps = Omit<
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
  'value' | 'defaultValue' | 'onValueChange'
> & {
  value?: boolean;
  defaultValue?: boolean;
  onValueChange?: ((value: boolean) => void);
};

const BoxSwitch = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  BoxSwitchProps
>(({ className, value, defaultValue, onValueChange, ...props }, ref) => {
  const yesId = React.useId();
  const noId = React.useId();
  const [innerValue, setInnerValue] = React.useState<boolean>(value ?? defaultValue ?? false);
  const actualValue = value ?? innerValue;

  const handleValueChange = (val: string) => {
    const newVal = val === 'yes';
    setInnerValue(newVal);
    onValueChange?.(newVal);
  };

  return (
    <RadioGroup
      value={actualValue ? 'yes' : 'no'}
      {...props}
      ref={ref}
      className={cn('flex rounded-lg w-fit border border-primary-dark dark:border-primary-light overflow-hidden', className)}
      onValueChange={handleValueChange}
    >
      <div>
        <RadioGroupItem value="no" id={noId} className="hidden" />
        <Label
          className={cn('inline-block px-6 py-4 w-full h-full cursor-pointer text-primary-dark dark:text-achromatic-lighter', !actualValue && 'bg-primary-dark text-achromatic-lighter dark:bg-primary-light dark:text-achromatic-dark', actualValue && 'hover:opacity-75')}
          htmlFor={noId}
        >
          No
        </Label>
      </div>

      <div className="w-[1px] bg-primary-dark dark:bg-primary-light" />

      <div>
        <RadioGroupItem value="yes" id={yesId} className="hidden" />
        <Label
          className={cn('inline-block px-6 py-4 w-full h-full cursor-pointer text-primary-dark dark:text-achromatic-lighter', actualValue && 'bg-primary-dark text-achromatic-lighter dark:bg-primary-light dark:text-achromatic-dark', !actualValue && 'hover:opacity-75')}
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
