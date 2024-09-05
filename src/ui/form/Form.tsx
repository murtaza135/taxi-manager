import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
  useForm,
  UseFormProps,
  UseFormReturn,
  Path,
  RegisterOptions,
  UseFormRegisterReturn,
  PathValue,
} from 'react-hook-form';
import { z, AnyZodObject, ZodEffects } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/utils/cn';
import { Label } from '@/ui/form/Label';
import { Button } from '@/ui/Button';
import { Separator } from '@/ui/Separator';

type AnyZodObjectOrEffect = AnyZodObject | ZodEffects<AnyZodObject>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UseZodFormProps<TSchema extends AnyZodObjectOrEffect, TContext = any> =
  Omit<UseFormProps<z.infer<TSchema>, TContext>, 'resolver'> & {
    schema: TSchema;
  };

type UseZodFormReturn<
  TSchema extends AnyZodObjectOrEffect,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
> = UseFormReturn<z.TypeOf<TSchema>, TContext, TTransformedValues> & {
  registerFileList: (
    name: Path<z.TypeOf<TSchema>>,
    options?: RegisterOptions<z.TypeOf<TSchema>, Path<z.TypeOf<TSchema>>> | undefined,
  ) => UseFormRegisterReturn<Path<z.TypeOf<TSchema>>> & {
    fileList?: FileList,
    onReset: () => void;
  };
};

const useZodForm = <
  TSchema extends AnyZodObjectOrEffect,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
>(
  { schema, ...rest }: UseZodFormProps<TSchema, TContext>,
): UseZodFormReturn<TSchema, TContext, TTransformedValues> => {
  const form = useForm<z.infer<TSchema>, TContext, TTransformedValues>(
    { resolver: zodResolver(schema), ...rest },
  );

  type RegisterFileList = UseZodFormReturn<TSchema, TContext, TTransformedValues>['registerFileList'];

  // TODO either add to useFormContext ot remove from useZodForm
  const registerFileList: RegisterFileList = React.useCallback((name, options) => {
    const field = form.register(name, options);

    const fileList = form.watch(name) as unknown;
    if (!(fileList instanceof FileList) && (typeof fileList !== 'undefined')) {
      throw new Error(`Form field \`${name}\` is not of type \`FileList\``);
    }

    const onReset = () => form.setValue(
      name,
      undefined as PathValue<z.TypeOf<TSchema>, Path<z.TypeOf<TSchema>>>,
    );

    return { ...field, fileList, onReset };
  }, [form]);

  return { ...form, registerFileList };
};

const Form = React.forwardRef<
  HTMLFormElement,
  React.HTMLAttributes<HTMLFormElement>
>(({ className, onSubmit, ...props }, ref) => {
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    onSubmit?.(event);
  };

  return (
    <form
      className={cn('bg-achromatic-lighter dark:bg-achromatic-dark text-primary-dark dark:text-primary-light px-7 py-6 rounded-lg', className)}
      ref={ref}
      onSubmit={handleSubmit}
      {...props}
    />
  );
});
Form.displayName = 'Form';

const FormTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h2
    className={cn('text-center text-2xl font-semibold', className)}
    ref={ref}
    {...props}
  >
    {children}
  </h2>
));
FormTitle.displayName = 'FormTitle';

type FormSectionProps = {
  title: string;
  onEdit?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const FormSection = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & FormSectionProps
>(({ title, onEdit, className, children, ...props }, ref) => (
  <div className="space-y-4">
    <div>
      <div className="flex justify-between items-center gap-2 pb-3">
        <h2 className="text-2xl font-bold">{title}</h2>
        {onEdit && (
          <Button variant="ghost" className="p-0" onClick={onEdit}>Edit</Button>
        )}
      </div>
      <Separator className="bg-primary-dark dark:bg-primary-light" />
    </div>

    <div
      className={cn('space-y-2', className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  </div>
));
FormSection.displayName = 'FormSection';

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) {
  const value = React.useMemo(() => ({ name: props.name }), [props.name]);
  return (
    <FormFieldContext.Provider value={value}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();
  const value = React.useMemo(() => ({ id }), [id]);

  return (
    <FormItemContext.Provider value={value}>
      <div ref={ref} className={cn('space-y-2', className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = 'FormItem';

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={className}
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = 'FormLabel';

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = 'FormControl';

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn('text-xs font-medium text-primary-dark dark:text-primary-light', className)}
      {...props}
    />
  );
});
FormDescription.displayName = 'FormDescription';

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn('text-sm text-red-500 dark:text-red-400', className)}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = 'FormMessage';

type FormGroupProps = {
  label?: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
};

function FormGroup({ label, description, className, children }: FormGroupProps) {
  const { error } = useFormField();

  return (
    <FormItem className={cn('', className)}>
      {!!label && <FormLabel>{label}</FormLabel>}
      <FormControl className={cn(error && 'border-2')}>{children}</FormControl>
      {!!description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
}

export {
  useZodForm,
  useFormField,
  FormProvider,
  Form,
  FormTitle,
  FormSection,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
  FormGroup,
};
