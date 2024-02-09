import * as React from 'react';
import { useFormField } from '@/ui/Form';
import { cn } from '@/utils/cn';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    const { error } = useFormField();
    return (
      <div className={cn(
        'flex items-center gap-2 w-full rounded-lg border border-primary-dark bg-achromatic-light px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-primary-light dark:bg-achromatic-dark',
        error && 'border-2',
        className,
      )}
      >
        {!!icon && <i className="text-sm">{icon}</i>}
        <input
          type={type}
          className="w-full outline-none text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium bg-transparent placeholder:text-achromatic-500 disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder:text-achromatic-400"
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
