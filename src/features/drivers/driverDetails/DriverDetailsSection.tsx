import { useParams } from 'react-router-dom';
import { MdModeEdit } from 'react-icons/md';
import { BiSave } from 'react-icons/bi';
import { useId, useState } from 'react';
import { useDriver } from '@/features/drivers/general/hooks/useDriver';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/Avatar';
import { extractInitials } from '@/utils/string/extractInitials';
import { capitalizeEachWord } from '@/utils/string/capitalizeEachWord';
import { EditableInput } from '@/ui/form/Input';
import { Button } from '@/ui/Button';
import { toDateInputString } from '@/utils/date/toDateInputString';
import { Checkbox } from '@/ui/form/Checkbox';
import { useUpdateDriver } from '@/features/drivers/general/hooks/useUpdateDriver';
import { useZodForm, FormProvider, FormField } from '@/ui/form/Form';
import { updateDriverTransformer, updateDriverDetailsSchema } from '@/features/drivers/driverDetails/schemas';
import { cn } from '@/utils/cn';
import { PhoneNumberCell, EmailCell } from '@/ui/dataview/Cell';

export function DriverDetailsSection() {
  const params = useParams();
  const id = Number(params.id);
  const { data } = useDriver(id);
  const pictureInputId = useId();
  const isRetiredCheckboxId = useId();
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const { mutate } = useUpdateDriver();

  const form = useZodForm({
    schema: updateDriverDetailsSchema,
    values: data,
  });

  const handleSubmit = form.handleSubmit((formData) => {
    setEditMode(false);
    const transformedData = updateDriverTransformer(formData);
    mutate({ id, ...transformedData }, {
      onError: () => {
        form.reset(data, { keepErrors: true });
      },
    });
  });

  return (
    <FormProvider {...form}>
      <form
        className="flex justify-start items-start gap-8 xs:gap-10 sm:gap-14 flex-col xs:flex-row py-3 px-2"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-row xs:flex-col justify-start items-start gap-4 flex-shrink-0">
          <label htmlFor={pictureInputId} className="relative group">
            <input
              id={pictureInputId}
              aria-label="picture"
              className="hidden"
              type="file"
            />
            <Avatar className="w-24 h-24 xs:w-28 xs:h-28 sm:!w-40 sm:!h-40 relative cursor-pointer select-none after:content-[''] after:absolute after:w-full after:h-full group-hover:after:bg-achromatic-dark/50">
              {data.picture_src && (
                <AvatarImage
                  src={data.picture_src}
                  alt={`driver-${data.id}`}
                />
              )}
              <AvatarFallback className="w-24 h-24 xs:w-28 xs:h-28 sm:!w-40 sm:!h-40 text-2xl sm:text-3xl">
                {extractInitials(data.name)}
              </AvatarFallback>
            </Avatar>
            <p className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-60 text-xl xs:text-2xl cursor-pointer">
              <MdModeEdit />
            </p>
          </label>

          <div className="flex gap-3 justify-center items-center w-full">
            {isEditMode
              ? (
                <Button
                  type="submit"
                  size="sm"
                  className="w-full flex justify-center items-center gap-1"
                >
                  <BiSave className="text-base" />
                  <span>Save</span>
                </Button>
              )
              : (
                <Button
                  type="button"
                  size="sm"
                  className="w-full flex justify-center items-center gap-1"
                  onClick={(event) => {
                    event.preventDefault();
                    setEditMode(true);
                  }}
                >
                  <MdModeEdit className="text-base" />
                  <span>Edit</span>
                </Button>
              )}
          </div>
        </div>

        <div className="space-y-3 flex-grow max-w-96">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <EditableInput
                type="text"
                className="text-2xl font-bold flex-grow"
                readOnly={!isEditMode}
                {...field}
                error={form.formState.errors[field.name]?.message}
                value={capitalizeEachWord(field.value)}
              />
            )}
          />

          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              !isEditMode && field.value
                ? (
                  <PhoneNumberCell phone={field.value} className="w-full">
                    <EditableInput
                      type="text"
                      title="Phone Number"
                      readOnly={!isEditMode}
                      {...field}
                      error={form.formState.errors[field.name]?.message}
                      value={field.value ?? ''}
                      className="!cursor-pointer"
                    />
                  </PhoneNumberCell>
                ) : (
                  <EditableInput
                    type="text"
                    title="Phone Number"
                    readOnly={!isEditMode}
                    {...field}
                    error={form.formState.errors[field.name]?.message}
                    value={field.value ?? ''}
                  />
                )
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              !isEditMode && field.value
                ? (
                  <EmailCell email={field.value} className="w-full">
                    <EditableInput
                      type="email"
                      title="Email"
                      readOnly={!isEditMode}
                      {...field}
                      error={form.formState.errors[field.name]?.message}
                      value={field.value ?? ''}
                      className="!cursor-pointer"
                    />
                  </EmailCell>
                ) : (
                  <EditableInput
                    type="email"
                    title="Email"
                    readOnly={!isEditMode}
                    {...field}
                    error={form.formState.errors[field.name]?.message}
                    value={field.value ?? ''}
                  />
                )
            )}
          />

          <FormField
            control={form.control}
            name="date_of_birth"
            render={({ field }) => (
              <EditableInput
                type="date"
                title="Date of Birth"
                onFocus={(event) => isEditMode && event.target.showPicker()}
                readOnly={!isEditMode}
                {...field}
                error={form.formState.errors[field.name]?.message}
                value={toDateInputString(new Date(field.value ?? ''))}
              />
            )}
          />

          <FormField
            control={form.control}
            name="national_insurance_number"
            render={({ field }) => (
              <EditableInput
                type="text"
                title="National Insurance Number"
                readOnly={!isEditMode}
                {...field}
                error={form.formState.errors[field.name]?.message}
                value={field.value ?? ''}
              />
            )}
          />

          <FormField
            control={form.control}
            name="is_retired"
            render={({ field: { value, onChange, ...rest } }) => (
              <div className={cn('space-y-0.5 pb-1 border-b border-transparent', isEditMode && 'border-achromatic-dark/65 dark:border-achromatic-500')}>
                <p className="font-semibold text-sm text-achromatic-dark/65 dark:text-achromatic-500 space-x-4 xs:space-x-6">
                  <span>Retired</span>
                  {form.formState.errors[rest.name]?.message && (
                    <span className="text-red-600 dark:text-red-500 italic text-xs">* {form.formState.errors[rest.name]?.message}</span>
                  )}
                </p>
                <div className="flex items-center justify-start gap-2 translate-x-[1px]">
                  <Checkbox
                    {...rest}
                    id={isRetiredCheckboxId}
                    checked={value}
                    onCheckedChange={onChange}
                    disabled={!isEditMode}
                    className="disabled:hidden"
                  />
                  <label htmlFor={isRetiredCheckboxId} className="translate-y-[1px]">
                    {value ? 'Yes' : 'No'}
                  </label>
                </div>
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="created_at"
            render={({ field }) => (
              <EditableInput
                type="date"
                title="Creation Date"
                readOnly
                {...field}
                error={form.formState.errors[field.name]?.message}
                value={toDateInputString(new Date(field.value ?? ''))}
              />
            )}
          />
        </div>
      </form>
    </FormProvider>
  );
}
