import { useParams } from 'react-router-dom';
import { MdModeEdit, MdCancel } from 'react-icons/md';
import { BiSave } from 'react-icons/bi';
import { useState, useMemo } from 'react';
import { EditableInput } from '@/ui/form/Input';
import { Button } from '@/ui/Button';
import { toDateInputString } from '@/utils/date/toDateInputString';
import { useZodForm, FormProvider, FormField } from '@/ui/form/Form';
import { updateTaxiLicenceDetailsSchema, updateTaxiLicenceDetailsTransformer } from '@/features/taxis/taxiDetails/schemas';
import { useTaxiLicenceDetails } from '@/features/taxis/general/hooks/useTaxiLicenceDetails';
import { useUpdateTaxiLicenceDetails } from '@/features/taxis/general/hooks/useUpdateTaxiLicenceDetails';
import { FileListViewer, FileConfig, FileListViewerOnChangeHandler, FileListViewerOnDeleteHandler } from '@/ui/files/FileListViewer';

export function TaxiLicenceDetailsUpdateSection() {
  const params = useParams();
  const taxi_id = Number(params.id);
  const { data } = useTaxiLicenceDetails(taxi_id);
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const { mutate: updateTaxiLicence } = useUpdateTaxiLicenceDetails();

  const form = useZodForm({
    schema: updateTaxiLicenceDetailsSchema,
    values: data,
  });

  const files: FileConfig[] = useMemo(() => [
    {
      key: 'compliance_certificate_document',
      title: 'Compliance Certificate',
      file: data.compliance_certificate_document_src ?? undefined,
      fileType: data.compliance_certificate_document_file_type,
      accept: 'image/*,.pdf',
    },
    {
      key: 'phc_licence_document',
      title: 'PHC Licence',
      file: data.phc_licence_document_src ?? undefined,
      fileType: data.phc_licence_document_file_type,
      accept: 'image/*,.pdf',
    },
  ], [
    data.compliance_certificate_document_src,
    data.compliance_certificate_document_file_type,
    data.phc_licence_document_src,
    data.phc_licence_document_file_type,
  ]);

  const handleSubmitUpdate = form.handleSubmit((formData) => {
    setEditMode(false);
    const transformedData = updateTaxiLicenceDetailsTransformer(formData);

    updateTaxiLicence({ id: data.id, taxi_id, ...transformedData }, {
      onError: () => {
        form.reset(data, { keepErrors: true });
      },
    });
  });

  const handleChangeFile: FileListViewerOnChangeHandler = (file, index) => {
    const { key } = files[index];
    updateTaxiLicence({ id: data.id, taxi_id, [key]: file });
  };

  const handleDeleteFile: FileListViewerOnDeleteHandler = (index) => {
    const { key } = files[index];
    updateTaxiLicence({ id: data.id, taxi_id, [key]: null });
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
            name="phc_number"
            render={({ field }) => (
              <EditableInput
                type="text"
                title="PHC Number"
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
            name="compliance_certificate_licence_number"
            render={({ field }) => (
              <EditableInput
                type="text"
                title="Compliance Certificate Licence Number"
                readOnly={!isEditMode}
                {...field}
                error={form.formState.errors[field.name]?.message}
                value={field.value}
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
                readOnly={!isEditMode}
                {...field}
                error={form.formState.errors[field.name]?.message}
                value={toDateInputString(new Date(field.value ?? ''))}
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
