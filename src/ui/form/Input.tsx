import * as React from 'react';
import { IoClose } from 'react-icons/io5';
import { MdOutlineUploadFile } from 'react-icons/md';
import { cn } from '@/utils/cn';
import { Button } from '@/ui/Button';

type BasicInputProps = {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

const BasicInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & BasicInputProps
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
BasicInput.displayName = 'BasicInput';

type FileInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  fileList?: FileList;
  onReset?: () => void;
};

const FileInput = React.forwardRef<
  HTMLInputElement,
  FileInputProps
>(({ fileList, onReset, id, className, ...props }, ref) => {
  const internalId = React.useId();
  const displayValue = fileList?.[0]?.name;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.value) {
      props.onChange?.(event);
    }
  };

  return (
    <label htmlFor={id ?? internalId} className={cn('flex items-center gap-2 w-full rounded-lg border border-primary-dark bg-achromatic-lighter px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-primary-light dark:bg-achromatic-dark', className)}>
      <input
        {...props}
        className="hidden"
        type="file"
        ref={ref}
        id={id ?? internalId}
        onChange={handleChange}
      />

      <div className="flex items-center gap-2 translate-y-[1px] w-full">
        <MdOutlineUploadFile className={cn('text-xl', !displayValue && 'text-primary-dark/70 dark:text-achromatic-400')} />
        <p className={cn('text-sm', !displayValue && 'text-primary-dark/70 dark:text-achromatic-400')}>
          {displayValue ?? 'No File Chosen'}
        </p>
      </div>

      {onReset && (
        <Button type="button" variant="ghost" className="p-0 text-lg translate-y-[1px]" onClick={onReset}>
          <IoClose />
        </Button>
      )}
    </label>
  );
});
FileInput.displayName = 'FileInput';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & ({
  type: 'file',
  fileList?: FileList;
  onReset?: () => void;
  leftIcon?: undefined;
  rightIcon?: undefined;
} | {
  type?: React.HTMLInputTypeAttribute;
  fileList?: undefined;
  onReset?: undefined;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
});

const Input = React.forwardRef<
  HTMLInputElement,
  InputProps
>((props, ref) => {
  if (props.type === 'file') {
    return (
      <FileInput {...props} ref={ref} />
    );
  }

  return (
    <BasicInput {...props} ref={ref} />
  );
});
Input.displayName = 'Input';

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

type BasicReadOnlyInputProps = {
  title: string;
};

const BasicReadOnlyInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & BasicReadOnlyInputProps
>(({ title, className, ...props }, ref) => (
  <div>
    <p className="font-bold">{title}</p>
    <input
      {...props}
      ref={ref}
      className={cn('w-full min-w-4 translate-y-[1px] outline-none text-sm text-primary-dark/80 dark:text-primary-light/65 bg-transparent placeholder:text-primary-dark/70 dark:placeholder:text-achromatic-400 file:hidden', className)}
      placeholder={props.placeholder || 'N/A'}
      readOnly
    />
  </div>
));
BasicReadOnlyInput.displayName = 'BasicReadOnlyInput';

type FileReadOnlyInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  title: string;
  fileList?: FileList;
};

const FileReadOnlyInput = React.forwardRef<
  HTMLInputElement,
  FileReadOnlyInputProps
>(({ title, fileList, className, ...props }, ref) => {
  const displayValue = fileList?.[0]?.name;

  return (
    <div>
      <p className="font-bold">{title}</p>
      <p className={cn('w-full min-w-4 pt-0.5 translate-y-[1px] outline-none text-sm text-primary-dark/80 dark:text-primary-light/65 bg-transparent', !displayValue && 'text-primary-dark/70 dark:text-achromatic-400', className)}>
        {displayValue || props.placeholder || 'N/A'}
      </p>
      <input
        {...props}
        className="hidden"
        type="file"
        ref={ref}
        readOnly
      />
    </div>
  );
});
FileReadOnlyInput.displayName = 'FileReadOnlyInput';

type DateReadOnlyInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  title: string;
};

const DateReadOnlyInput = React.forwardRef<
  HTMLInputElement,
  DateReadOnlyInputProps
>(({ title, className, ...props }, ref) => (
  <div>
    <p className="font-bold">{title}</p>
    <p className={cn('w-full min-w-4 pt-0.5 translate-y-[1px] outline-none text-sm text-primary-dark/80 dark:text-primary-light/65 bg-transparent', !props.value && 'text-primary-dark/70 dark:text-achromatic-400', className)}>
      {props.value || props.placeholder || 'N/A'}
    </p>
    <input
      {...props}
      className="hidden"
      type="date"
      ref={ref}
      readOnly
    />
  </div>
));
DateReadOnlyInput.displayName = 'DateReadOnlyInput';

type ReadOnlyInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  title: string;
} & ({
  type: 'file',
  fileList?: FileList;
} | {
  type?: React.HTMLInputTypeAttribute;
  fileList?: undefined;
});

const ReadOnlyInput = React.forwardRef<
  HTMLInputElement,
  ReadOnlyInputProps
>((props, ref) => {
  if (props.type === 'file') {
    return (
      <FileReadOnlyInput {...props} ref={ref} />
    );
  }

  if (props.type === 'date') {
    return (
      <DateReadOnlyInput {...props} ref={ref} />
    );
  }

  return (
    <BasicReadOnlyInput {...props} ref={ref} />
  );
});
ReadOnlyInput.displayName = 'ReadOnlyInput';

type EditableInputProps = {
  title?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

// TODO combine with ReadOnlyInput
const EditableInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & EditableInputProps
>(({ title, error, leftIcon, rightIcon, className, ...props }, ref) => (
  <div className="w-full">
    {title && (
      <p className="font-semibold text-sm text-achromatic-dark/65 dark:text-achromatic-500 space-x-4 xs:space-x-6">
        <span>{title}</span>
        {error && <span className="text-red-700 dark:text-red-500 italic text-xs">* {error}</span>}
      </p>
    )}

    <div className={cn('flex items-center gap-1 w-full border-achromatic-dark/65 dark:border-achromatic-500 pb-1 border-b', props.readOnly && 'border-transparent dark:border-transparent placeholder:text-achromatic-darker dark:placeholder:text-achromatic-lighter')}>
      {!!leftIcon && (
        <span className="-translate-y-[1px]">
          {leftIcon}
        </span>
      )}

      <input
        {...props}
        ref={ref}
        className={cn('w-full min-w-4 outline-none bg-transparent file:hidden overflow-ellipsis overflow-hidden whitespace-nowrap cursor-auto placeholder:text-achromatic-dark/65 dark:placeholder:text-achromatic-500 read-only:cursor-default', className)}
        placeholder={props.placeholder || 'N/A'}
      />

      {!!rightIcon && (
        <span className="-translate-y-[1px]">
          {rightIcon}
        </span>
      )}
    </div>
  </div>
));
EditableInput.displayName = 'EditableInput';

export {
  Input,
  DebouncedInput,
  ReadOnlyInput,
  EditableInput,
};
