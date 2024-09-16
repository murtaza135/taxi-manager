import { useParams, useNavigate } from 'react-router-dom';
import { FaTrashAlt, FaPoundSign } from 'react-icons/fa';
import { TbCurrencyPound, TbCurrencyPoundOff } from 'react-icons/tb';
import { useMemo, useState } from 'react';
import { MdModeEdit, MdCancel } from 'react-icons/md';
import { BiSave } from 'react-icons/bi';
import { useRent } from '@/features/rent/general/hooks/useRent';
import { EditableInput } from '@/ui/form/Input';
import { toDateInputString } from '@/utils/date/toDateInputString';
import { FileListViewer, FileConfig, FileListViewerOnChangeHandler, FileListViewerOnDeleteHandler } from '@/ui/files/FileListViewer';
import { Button } from '@/ui/Button';
import { useUpdateRent } from '@/features/rent/general/hooks/useUpdateRent';
import { usePayRent } from '@/features/rent/general/hooks/usePayRent';
import { useDeleteRent } from '@/features/rent/general/hooks/useDeleteRent';
import { useUnpayRent } from '@/features/rent/general/hooks/useUnpayRent';
import { useZodForm, FormProvider, FormField } from '@/ui/form/Form';
import { updateRentDetailsSchema, updateRentDetailsTransformer } from '@/features/rent/rentDetails/schemas';

export function RentDetailsSection() {
  const params = useParams();
  const rent_id = Number(params.id);
  const { data } = useRent(rent_id);
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const { mutate: updateRent } = useUpdateRent();
  const { mutate: payRent } = usePayRent();
  const { mutate: unpayRent } = useUnpayRent();
  const { mutate: deleteRent } = useDeleteRent();
  const navigate = useNavigate();

  const form = useZodForm({
    schema: updateRentDetailsSchema,
    values: data,
  });

  const files: FileConfig[] = useMemo(() => [
    {
      key: 'receipt_document',
      title: 'Receipt',
      file: data.receipt_document_src ?? undefined,
      fileType: data.receipt_document_file_type,
      accept: 'image/*,.pdf',
    },
  ], [data.receipt_document_src, data.receipt_document_file_type]);

  const handleSubmitUpdate = form.handleSubmit((formData) => {
    setEditMode(false);
    const transformedData = updateRentDetailsTransformer(formData);

    // TODO check if data has actually been changed (not just isDirty?) and only then mutate
    updateRent({ id: rent_id, ...transformedData }, {
      onError: () => {
        form.reset(data, { keepErrors: true });
      },
    });
  });

  const handleChangeFile: FileListViewerOnChangeHandler = (file, index) => {
    const { key } = files[index];
    updateRent({ id: rent_id, [key]: file });
  };

  const handleDeleteFile: FileListViewerOnDeleteHandler = (index) => {
    const { key } = files[index];
    updateRent({ id: rent_id, [key]: null });
  };

  const handlePayRent: React.MouseEventHandler<HTMLButtonElement> = () => {
    payRent(rent_id);
  };

  const handleUnpayRent: React.MouseEventHandler<HTMLButtonElement> = () => {
    unpayRent(rent_id);
  };

  const handleDeleteRent: React.MouseEventHandler<HTMLButtonElement> = () => {
    deleteRent(rent_id, {
      onSuccess: () => navigate('/rents'),
    });
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

          <div className="flex gap-3 justify-center items-center w-full">
            {!data.is_paid
              ? (
                <Button
                  type="button"
                  size="sm"
                  className="w-full flex justify-center items-center gap-1"
                  onClick={handlePayRent}
                >
                  <TbCurrencyPound className="text-base" />
                  <span className="translate-y-[1px]">Pay</span>
                </Button>
              )
              : (
                <Button
                  type="button"
                  size="sm"
                  variant="danger"
                  className="w-full flex justify-center items-center gap-1"
                  onClick={handleUnpayRent}
                >
                  <TbCurrencyPoundOff className="text-base" />
                  <span className="translate-y-[1px]">Unpay</span>
                </Button>
              )}

            <Button
              type="button"
              size="sm"
              variant="danger"
              className="w-full flex justify-center items-center gap-1.5"
              onClick={handleDeleteRent}
            >
              <FaTrashAlt className="text-sm" />
              <span className="translate-y-[1px]">Delete</span>
            </Button>
          </div>

        </div>

        <div className="space-y-3 flex-grow max-w-96">
          <EditableInput
            type="text"
            title="Rent ID"
            readOnly
            value={rent_id}
          />

          <FormField
            control={form.control}
            name="amount"
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

          <div className="space-y-0.5 pb-1 border-b border-transparent">
            <p className="font-semibold text-sm text-achromatic-dark/65 dark:text-achromatic-500 space-x-4 xs:space-x-6">
              Paid?
            </p>
            <p className="flex items-center justify-start gap-2 translate-x-[1px]">
              {data.is_paid ? 'Yes' : 'No'}
            </p>
          </div>

          <EditableInput
            type="date"
            title="Paid Date"
            readOnly
            value={toDateInputString(new Date(data.paid_date ?? ''))}
          />

          <EditableInput
            type="date"
            title="Creation Date"
            readOnly
            value={toDateInputString(new Date(data.created_at ?? ''))}
          />
        </div>
      </form>
    </FormProvider>
  );
}
