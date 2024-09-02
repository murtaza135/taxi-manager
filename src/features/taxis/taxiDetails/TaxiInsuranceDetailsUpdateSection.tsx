import { useParams } from 'react-router-dom';
import { MdModeEdit } from 'react-icons/md';
import { BiSave } from 'react-icons/bi';
import { useId, useState, useMemo } from 'react';
import { EditableInput } from '@/ui/form/Input';
import { Button } from '@/ui/Button';
import { toDateInputString } from '@/utils/date/toDateInputString';
import { useZodForm, FormProvider, FormField } from '@/ui/form/Form';
import { updateTaxiInsuranceSchema, updateTaxiInsuranceTransformer } from '@/features/taxis/taxiDetails/schemas';
import { useTaxiInsuranceDetails } from '@/features/taxis/general/hooks/useTaxiInsuranceDetails';
import { useUpdateTaxiInsuranceDetails } from '@/features/taxis/general/hooks/useUpdateTaxiInsuranceDetails';
import { Checkbox } from '@/ui/form/Checkbox';
import { cn } from '@/utils/cn';
import { FileListViewer, FileConfig, FileListViewerOnChangeHandler, FileListViewerOnDeleteHandler } from '@/ui/files/FileListViewer';

export function TaxiInsuranceDetailsUpdateSection() {
  const params = useParams();
  const taxi_id = Number(params.id);
  const { data } = useTaxiInsuranceDetails(taxi_id);
  const isRetiredCheckboxId = useId();
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const { mutate: updateTaxiInsurance } = useUpdateTaxiInsuranceDetails();

  const form = useZodForm({
    schema: updateTaxiInsuranceSchema,
    values: data,
  });

  const files: FileConfig[] = useMemo(() => [
    {
      key: 'insurance',
      file: data.document_src ?? undefined,
      fileType: data.document_file_type,
      accept: 'image/*,.pdf',
    },
  ], [data.document_src, data.document_file_type]);

  const handleSubmitUpdate = form.handleSubmit((formData) => {
    setEditMode(false);
    const transformedData = updateTaxiInsuranceTransformer(formData);

    updateTaxiInsurance({ id: data.id, taxi_id, ...transformedData }, {
      onError: () => {
        form.reset(data, { keepErrors: true });
      },
    });
  });

  const handleChangeFile: FileListViewerOnChangeHandler = (file, index) => {
    const { key } = files[index];
    updateTaxiInsurance({ id: data.id, taxi_id, [key]: file });
  };

  const handleDeleteFile: FileListViewerOnDeleteHandler = (index) => {
    const { key } = files[index];
    updateTaxiInsurance({ id: data.id, taxi_id, [key]: null });
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
            name="policy_number"
            render={({ field }) => (
              <EditableInput
                type="text"
                title="Policy Number"
                className="text-2xl font-bold flex-grow uppercase placeholder:normal-case"
                readOnly={!isEditMode}
                {...field}
                error={form.formState.errors[field.name]?.message}
                value={field.value}
              />
            )}
          />

          <FormField
            control={form.control}
            name="is_any_driver"
            render={({ field: { value, onChange, ...rest } }) => (
              <div className={cn('space-y-0.5 pb-1 border-b border-transparent', isEditMode && 'border-achromatic-dark/65 dark:border-achromatic-500')}>
                <p className="font-semibold text-sm text-achromatic-dark/65 dark:text-achromatic-500 space-x-4 xs:space-x-6">
                  <span>Any Driver?</span>
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
            name="start_date"
            render={({ field }) => (
              <EditableInput
                type="date"
                title="Start Date"
                readOnly={!isEditMode}
                {...field}
                error={form.formState.errors[field.name]?.message}
                value={toDateInputString(new Date(field.value))}
              />
            )}
          />

          <FormField
            control={form.control}
            name="end_date"
            render={({ field }) => (
              <EditableInput
                type="date"
                title="End Date"
                readOnly={!isEditMode}
                {...field}
                error={form.formState.errors[field.name]?.message}
                value={toDateInputString(new Date(field.value))}
              />
            )}
          />
        </div>
      </form>
    </FormProvider>
  );
}
