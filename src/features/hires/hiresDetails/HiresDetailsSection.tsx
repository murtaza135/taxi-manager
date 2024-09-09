import { useParams } from 'react-router-dom';
import { FaPoundSign } from 'react-icons/fa';
import { MdModeEdit, MdCancel } from 'react-icons/md';
import { BiSave } from 'react-icons/bi';
import { RiIndeterminateCircleFill } from 'react-icons/ri';
import { IoReturnDownBack } from 'react-icons/io5';
import { useState, useMemo } from 'react';
import { useHireDetails } from '@/features/hires/general/hooks/useHireDetails';
import { EditableInput } from '@/ui/form/Input';
import { Button } from '@/ui/Button';
import { toDateInputString } from '@/utils/date/toDateInputString';
import { useUpdateHireAgreementDetails } from '@/features/hires/general/hooks/useUpdateHireAgreement';
import { useZodForm, FormProvider, FormField } from '@/ui/form/Form';
import { updateHireAgreementDetailsTransformer, updateHireAgreementDetailsSchema } from '@/features/hires/hiresDetails/schemas';
import { FileListViewer, FileConfig, FileListViewerOnChangeHandler, FileListViewerOnDeleteHandler } from '@/ui/files/FileListViewer';

export function HiresDetailsSection() {
  const params = useParams();
  const hire_id = Number(params.id);
  const { data } = useHireDetails(hire_id);
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const { mutate: updateHire } = useUpdateHireAgreementDetails();

  const form = useZodForm({
    schema: updateHireAgreementDetailsSchema,
    values: data,
  });

  const files: FileConfig[] = useMemo(() => [
    {
      key: 'permissionLetter',
      title: 'Permission Letter',
      file: data.permission_letter_document_src ?? undefined,
      fileType: data.permission_letter_document_file_type,
      accept: 'image/*,pdf',
    },
    {
      key: 'contract',
      title: 'Contract',
      file: data.contract_document_src ?? undefined,
      fileType: data.contract_document_file_type,
      accept: 'image/*,pdf',
    },
    {
      key: 'depositReceipt',
      title: 'Deposit Receipt',
      file: data.deposit_receipt_document_src ?? undefined,
      fileType: data.deposit_receipt_document_file_type,
      accept: 'image/*,pdf',
    },
  ], [
    data.permission_letter_document_src,
    data.permission_letter_document_file_type,
    data.contract_document_src,
    data.contract_document_file_type,
    data.deposit_receipt_document_src,
    data.deposit_receipt_document_file_type,
  ]);

  const handleSubmitUpdate = form.handleSubmit((formData) => {
    setEditMode(false);
    const transformedData = updateHireAgreementDetailsTransformer(formData);

    // TODO check if data has actually been changed (not just isDirty?) and only then mutate
    updateHire({ id: hire_id, ...transformedData }, {
      onError: () => {
        form.reset(data, { keepErrors: true });
      },
    });
  });

  const handleChangeFile: FileListViewerOnChangeHandler = (file, index) => {
    const { key } = files[index];
    updateHire({ id: hire_id, [key]: file });
  };

  const handleDeleteFile: FileListViewerOnDeleteHandler = (index) => {
    const { key } = files[index];
    updateHire({ id: hire_id, [key]: null });
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

          {data.is_retired
            ? (
              <Button
                type="button"
                size="sm"
                className="w-full flex justify-center items-center gap-1"
                onClick={(event) => {
                  event.preventDefault();
                  updateHire({ id: hire_id, is_retired: false });
                }}
              >
                <IoReturnDownBack className="text-base" />
                <span>Restart</span>
              </Button>
            )
            : (
              <Button
                type="button"
                size="sm"
                variant="danger"
                className="w-full flex justify-center items-center gap-1"
                onClick={(event) => {
                  event.preventDefault();
                  updateHire({ id: hire_id, is_retired: true });
                }}
              >
                <RiIndeterminateCircleFill className="text-base" />
                <span>Terminate</span>
              </Button>
            )}
        </div>

        <div className="space-y-3 flex-grow max-w-96">
          <FormField
            control={form.control}
            name="rent_amount"
            render={({ field }) => (
              <EditableInput
                type="text"
                title="Rent Amount"
                readOnly={!isEditMode}
                {...field}
                error={form.formState.errors[field.name]?.message}
                leftIcon={<FaPoundSign className="text-sm" />}
              />
            )}
          />

          <FormField
            control={form.control}
            name="deposit_amount"
            render={({ field }) => (
              <EditableInput
                type="text"
                title="Deposit Amount"
                readOnly={!isEditMode}
                {...field}
                error={form.formState.errors[field.name]?.message}
                leftIcon={<FaPoundSign className="text-sm" />}
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
                value={toDateInputString(new Date(field.value ?? ''))}
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
