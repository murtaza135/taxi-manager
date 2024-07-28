import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/utils/cn';

type InputProps = {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & InputProps
>(({ className, leftIcon, rightIcon, ...props }, ref) => (
  <div className={cn('flex items-center gap-2 w-full rounded-lg border border-primary-dark bg-achromatic-lighter px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-primary-light dark:bg-achromatic-dark', className)}>
    {!!leftIcon && leftIcon}

    <input
      className="w-full min-w-4 translate-y-[1px] outline-none text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-achromatic-dark dark:file:text-achromatic-light bg-transparent placeholder:text-primary-dark/70 disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder:text-achromatic-400"
      ref={ref}
      {...props}
    />

    {!!rightIcon && rightIcon}
  </div>
));
Input.displayName = 'Input';

const FileInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & InputProps & { displayValue?: string; }
>(({ className, leftIcon, rightIcon, displayValue, ...props }, ref) => {
  const temp1 = 1;
  // React.useEffect(() => {
  //   console.log(ref);
  // }, [ref]);
  // const { getValues } = useFormContext();

  console.log(displayValue);
  // const temp2 = getValues(props.name ?? '') as FileList | undefined;
  // console.log(temp2?.[0].name);

  return (
    <div className={cn('flex items-center gap-2 w-full rounded-lg border border-primary-dark bg-achromatic-lighter px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-primary-light dark:bg-achromatic-dark', className)}>
      {!!leftIcon && leftIcon}

      <input
        className="w-full min-w-4 translate-y-[1px] outline-none text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-achromatic-dark dark:file:text-achromatic-light bg-transparent placeholder:text-primary-dark/70 disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder:text-achromatic-400"
        ref={ref}
        {...props}
      />

      {!!rightIcon && rightIcon}
    </div>
  );
});
FileInput.displayName = 'FileInput';

type DebouncedInputProps =
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> &
  InputProps & {
    value?: string | number;
    onChange?: (value: string | number) => void;
    debounce?: number;
  };

const DebouncedInput = React.forwardRef<HTMLInputElement, DebouncedInputProps>((
  {
    className,
    leftIcon,
    rightIcon,
    debounce = 500,
    value: initialValue = '',
    onChange,
    ...props
  },
  ref,
) => {
  const [value, setValue] = React.useState(initialValue);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange?.(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, onChange, debounce]);

  return (
    <div className={cn('flex items-center gap-2 w-full rounded-lg border border-primary-dark bg-achromatic-lighter px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-primary-light dark:bg-achromatic-dark', className)}>
      {!!leftIcon && leftIcon}

      <input
        className="w-full min-w-4 translate-y-[1px] outline-none text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium bg-transparent placeholder:text-primary-dark/70 disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder:text-achromatic-400"
        ref={ref}
        value={value}
        onChange={handleInputChange}
        {...props}
      />

      {!!rightIcon && rightIcon}
    </div>
  );
});
DebouncedInput.displayName = 'DebouncedInput';

export {
  Input,
  FileInput,
  DebouncedInput,
};
