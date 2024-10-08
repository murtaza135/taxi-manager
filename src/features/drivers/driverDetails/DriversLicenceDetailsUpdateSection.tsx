import { useParams } from 'react-router-dom';
import { MdModeEdit, MdCancel } from 'react-icons/md';
import { BiSave } from 'react-icons/bi';
import { useState, useMemo } from 'react';
import { EditableInput } from '@/ui/form/Input';
import { Button } from '@/ui/Button';
import { toDateInputString } from '@/utils/date/toDateInputString';
import { useZodForm, FormProvider, FormField } from '@/ui/form/Form';
import { updateDriversLicenceDetailsSchema, updateDriversLicenceTransformer } from '@/features/drivers/driverDetails/schemas';
import { useDriversLicenceDetails } from '@/features/drivers/general/hooks/useDriversLicenceDetails';
import { useUpdateDriversLicenceDetails } from '@/features/drivers/general/hooks/useUpdateDriversLicenceDetails';
import { FileListViewer, FileConfig, FileListViewerOnChangeHandler, FileListViewerOnDeleteHandler } from '@/ui/files/FileListViewer';

export function DriversLicenceDetailsUpdateSection() {
  const params = useParams();
  const driver_id = Number(params.id);
  const { data } = useDriversLicenceDetails(driver_id);
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const { mutate: updateDriversLicence } = useUpdateDriversLicenceDetails();

  const form = useZodForm({
    schema: updateDriversLicenceDetailsSchema,
    values: data,
  });

  const files: FileConfig[] = useMemo(() => [
    {
      key: 'document',
      title: 'Drivers Licence (Front)',
      file: data.document_src ?? undefined,
      fileType: data.document_file_type,
      accept: 'image/*,.pdf',
    },
    {
      key: 'document2',
      title: 'Drivers Licence (Back)',
      file: data.document2_src ?? undefined,
      fileType: data.document2_file_type,
      accept: 'image/*,.pdf',
    },
  ], [
    data.document_src,
    data.document_file_type,
    data.document2_src,
    data.document2_file_type,
  ]);

  const handleSubmitUpdate = form.handleSubmit((formData) => {
    setEditMode(false);
    const transformedData = updateDriversLicenceTransformer(formData);

    // TODO check if data has actually been changed (not just isDirty?) and only then mutate
    updateDriversLicence({ id: data.id, driver_id, ...transformedData }, {
      onError: () => {
        form.reset(data, { keepErrors: true });
      },
    });
  });

  const handleChangeFile: FileListViewerOnChangeHandler = (file, index) => {
    const { key } = files[index];
    updateDriversLicence({ id: data.id, driver_id, [key]: file });
  };

  const handleDeleteFile: FileListViewerOnDeleteHandler = (index) => {
    const { key } = files[index];
    updateDriversLicence({ id: data.id, driver_id, [key]: null });
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
            name="licence_number"
            render={({ field }) => (
              <EditableInput
                type="text"
                title="Licence Number"
                readOnly={!isEditMode}
                {...field}
                error={form.formState.errors[field.name]?.message}
              />
            )}
          />

          <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
              <EditableInput
                type="date"
                title="Start Date"
                onFocus={(event) => isEditMode && event.target.showPicker()}
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
                onFocus={(event) => isEditMode && event.target.showPicker()}
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
