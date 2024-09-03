import { useParams } from 'react-router-dom';
import { MdModeEdit, MdCancel } from 'react-icons/md';
import { BiSave } from 'react-icons/bi';
import { useId, useState, useMemo } from 'react';
import { useDriverDetails } from '@/features/drivers/general/hooks/useDriverDetails';
import { capitalizeEachWord } from '@/utils/string/capitalizeEachWord';
import { EditableInput } from '@/ui/form/Input';
import { Button } from '@/ui/Button';
import { toDateInputString } from '@/utils/date/toDateInputString';
import { Checkbox } from '@/ui/form/Checkbox';
import { useUpdateDriverDetails } from '@/features/drivers/general/hooks/useUpdateDriverDetails';
import { useZodForm, FormProvider, FormField } from '@/ui/form/Form';
import { updateDriverTransformer, updateDriverDetailsSchema } from '@/features/drivers/driverDetails/schemas';
import { cn } from '@/utils/cn';
import { PhoneNumberCell, EmailCell } from '@/ui/dataview/Cell';
import { FileListViewer, FileConfig, FileListViewerOnChangeHandler, FileListViewerOnDeleteHandler } from '@/ui/files/FileListViewer';

export function DriverDetailsSection() {
  const params = useParams();
  const driver_id = Number(params.id);
  const { data } = useDriverDetails(driver_id);
  const isRetiredCheckboxId = useId();
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const { mutate: updateDriver } = useUpdateDriverDetails();

  const form = useZodForm({
    schema: updateDriverDetailsSchema,
    values: data,
  });

  const files: FileConfig[] = useMemo(() => [
    {
      key: 'picture',
      title: 'Driver Picture',
      file: data.picture_src ?? undefined,
      fileType: data.picture_file_type,
      accept: 'image/*',
    },
  ], [data.picture_src, data.picture_file_type]);

  const handleSubmitUpdate = form.handleSubmit((formData) => {
    setEditMode(false);
    const transformedData = updateDriverTransformer(formData);

    // TODO check if data has actually been changed (not just isDirty?) and only then mutate
    updateDriver({ id: driver_id, ...transformedData }, {
      onError: () => {
        form.reset(data, { keepErrors: true });
      },
    });
  });

  const handleChangeFile: FileListViewerOnChangeHandler = (file, index) => {
    const { key } = files[index];
    updateDriver({ id: driver_id, [key]: file });
  };

  const handleDeleteFile: FileListViewerOnDeleteHandler = (index) => {
    const { key } = files[index];
    updateDriver({ id: driver_id, [key]: null });
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex justify-start items-start gap-8 sm:gap-14 flex-col sm:flex-row py-3 px-2"
        onSubmit={handleSubmitUpdate}
      >
        <div className="flex flex-col justify-start items-start gap-4 flex-shrink-0">
          <FileListViewer
            files={files}
            onChange={handleChangeFile}
            onDelete={handleDeleteFile}
          />

          <div className="flex gap-3 justify-center items-center w-full">
            {isEditMode
              ? (
                <>
                  <Button
                    type="submit"
                    size="sm"
                    className="w-full flex justify-center items-center gap-1"
                  >
                    <BiSave className="text-base" />
                    <span>Save</span>
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    className="w-full flex justify-center items-center gap-1"
                    variant="danger"
                    onClick={(event) => {
                      event.preventDefault();
                      setEditMode(false);
                      form.reset(data);
                    }}
                  >
                    <MdCancel className="text-base" />
                    <span>Cancel</span>
                  </Button>
                </>
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
                  <PhoneNumberCell phone={field.value} className="w-full [&>.icon]:pr-6">
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
                  <EmailCell email={field.value} className="w-full [&>.icon]:pr-6">
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
