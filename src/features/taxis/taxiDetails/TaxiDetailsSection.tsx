import { useParams } from 'react-router-dom';
import { MdModeEdit } from 'react-icons/md';
import { BiSave } from 'react-icons/bi';
import { useMemo, useState } from 'react';
import { useTaxiDetails } from '@/features/taxis/general/hooks/useTaxiDetails';
import { EditableInput } from '@/ui/form/Input';
import { Button } from '@/ui/Button';
import { toDateInputString } from '@/utils/date/toDateInputString';
import { useUpdateTaxiDetails } from '@/features/taxis/general/hooks/useUpdateTaxiDetails';
import { useZodForm, FormProvider, FormField } from '@/ui/form/Form';
import { updateTaxiDetailsTransformer, updateTaxiDetailsSchema } from '@/features/taxis/taxiDetails/schemas';
import { FileListViewer, FileConfig, FileListViewerOnChangeHandler, FileListViewerOnDeleteHandler } from '@/ui/files/FileListViewer';

// TODO PictureViewer for picture and logbook document

export function TaxiDetailsSection() {
  const params = useParams();
  const id = Number(params.id);
  const { data } = useTaxiDetails(id);
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const { mutate: updateTaxi } = useUpdateTaxiDetails();

  const form = useZodForm({
    schema: updateTaxiDetailsSchema,
    values: data,
  });

  const files: FileConfig[] = useMemo(() => [
    {
      type: 'picture',
      file: data.picture_src ?? undefined,
      fileType: data.picture_file_type,
      accept: 'image/*',
    },
    {
      type: 'logbook',
      file: data.logbook_document_src ?? undefined,
      fileType: data.logbook_document_file_type,
      accept: 'image/*,.pdf',
    },
  ], [
    data.picture_src,
    data.picture_file_type,
    data.logbook_document_src,
    data.logbook_document_file_type,
  ]);

  const handleSubmitUpdate = form.handleSubmit((formData) => {
    setEditMode(false);
    const transformedData = updateTaxiDetailsTransformer(formData);

    // TODO check if data has actually been changed (not just isDirty?) and only then mutate
    updateTaxi({ id, ...transformedData }, {
      onError: () => {
        form.reset(data, { keepErrors: true });
      },
    });
  });

  const handleChangeFile: FileListViewerOnChangeHandler = (file, index) => {
    const key = files[index].type;
    updateTaxi({ id, [key]: file });
  };

  const handleDeleteFile: FileListViewerOnDeleteHandler = (index) => {
    const key = files[index].type;
    updateTaxi({ id, [key]: null });
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex justify-start items-start gap-8 sm:gap-14 flex-col sm:flex-row py-3 px-2"
        onSubmit={handleSubmitUpdate}
      >
        <div className="flex flex-col justify-start items-start gap-4 flex-shrink-0">
          <FileListViewer files={files} onChange={handleChangeFile} onDelete={handleDeleteFile} />

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
            name="number_plate"
            render={({ field }) => (
              <EditableInput
                type="text"
                className="text-2xl font-bold flex-grow uppercase placeholder:normal-case"
                readOnly={!isEditMode}
                {...field}
                error={form.formState.errors[field.name]?.message}
                value={field.value.toUpperCase()}
              />
            )}
          />

          <FormField
            control={form.control}
            name="make"
            render={({ field }) => (
              <EditableInput
                type="text"
                title="Make"
                readOnly={!isEditMode}
                {...field}
                error={form.formState.errors[field.name]?.message}
                value={field.value ?? ''}
              />
            )}
          />

          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <EditableInput
                type="text"
                title="Model"
                readOnly={!isEditMode}
                {...field}
                error={form.formState.errors[field.name]?.message}
                value={field.value ?? ''}
              />
            )}
          />

          <FormField
            control={form.control}
            name="colour"
            render={({ field }) => (
              <EditableInput
                type="text"
                title="Colour"
                readOnly={!isEditMode}
                {...field}
                error={form.formState.errors[field.name]?.message}
                value={field.value ?? ''}
              />
            )}
          />

          <FormField
            control={form.control}
            name="chassis_number"
            render={({ field }) => (
              <EditableInput
                type="text"
                title="Chassis Number"
                readOnly={!isEditMode}
                {...field}
                error={form.formState.errors[field.name]?.message}
                value={field.value ?? ''}
              />
            )}
          />

          <FormField
            control={form.control}
            name="registration_date"
            render={({ field }) => (
              <EditableInput
                type="date"
                title="Vehicle Registration Date"
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
            name="expected_expiry_date"
            render={({ field }) => (
              <EditableInput
                type="date"
                title="Expected Vehicle Expiry"
                readOnly={!isEditMode}
                {...field}
                error={form.formState.errors[field.name]?.message}
                value={toDateInputString(new Date(field.value ?? ''))}
              />
            )}
          />

          <FormField
            control={form.control}
            name="road_tax_expiry_date"
            render={({ field }) => (
              <EditableInput
                type="date"
                title="Road Tax Expiry"
                readOnly={!isEditMode}
                {...field}
                error={form.formState.errors[field.name]?.message}
                value={toDateInputString(new Date(field.value ?? ''))}
              />
            )}
          />

          <FormField
            control={form.control}
            name="cc"
            render={({ field }) => (
              <EditableInput
                type="number"
                title="CC"
                readOnly={!isEditMode}
                {...field}
                error={form.formState.errors[field.name]?.message}
                value={field.value ?? 0}
              />
            )}
          />

          <FormField
            control={form.control}
            name="fuel_type"
            render={({ field }) => (
              <EditableInput
                type="text"
                title="Fuel Type"
                readOnly={!isEditMode}
                {...field}
                error={form.formState.errors[field.name]?.message}
                value={field.value ?? ''}
              />
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
