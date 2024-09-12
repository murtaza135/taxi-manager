import { useParams } from 'react-router-dom';
import { MdModeEdit, MdCancel } from 'react-icons/md';
import { BiSave } from 'react-icons/bi';
import { useId, useState, useMemo } from 'react';
// import { useDriverDetails } from '@/features/drivers/general/hooks/useDriverDetails';
import { useCompany } from '@/features/auth/hooks/useCompany';
import { capitalizeEachWord } from '@/utils/string/capitalizeEachWord';
import { EditableInput } from '@/ui/form/Input';
import { Button } from '@/ui/Button';
import { toDateInputString } from '@/utils/date/toDateInputString';
import { Checkbox } from '@/ui/form/Checkbox';
// import { useUpdateDriverDetails } from '@/features/drivers/general/hooks/useUpdateDriverDetails';
import { useZodForm, FormProvider, FormField } from '@/ui/form/Form';
// import { updateDriverTransformer, updateDriverDetailsSchema } from '@/features/drivers/driverDetails/schemas';
import { companyDetailsSchema, companyDetailsTransformer } from '@/features/settings/schemas';
import { cn } from '@/utils/cn';
import { PhoneNumberCell, EmailCell } from '@/ui/dataview/Cell';
import { FileListViewer, FileConfig, FileListViewerOnChangeHandler, FileListViewerOnDeleteHandler } from '@/ui/files/FileListViewer';
import { useSession } from '@/features/auth/hooks/useSession';

const updateCompanyDetails = (arg1: unknown, arg2?: unknown) => { };

export function SettingsCompanyDetailsSection() {
  const { data } = useCompany();
  const { data: sessionData } = useSession();
  const { email } = sessionData.user;
  const [isEditMode, setEditMode] = useState<boolean>(false);
  // const { mutate: updateDriver } = useUpdateDriverDetails();

  const form = useZodForm({
    schema: companyDetailsSchema,
    values: data,
  });

  const files: FileConfig[] = useMemo(() => [
    {
      key: 'picture',
      title: 'Logo',
      file: data.logo_src ?? undefined,
      fileType: data.logo_file_type,
      accept: 'image/*',
    },
  ], [data.logo_src, data.logo_file_type]);

  const handleSubmitUpdate = form.handleSubmit((formData) => {
    setEditMode(false);
    const transformedData = companyDetailsTransformer(formData);

    // TODO check if data has actually been changed (not just isDirty?) and only then mutate
    updateCompanyDetails(transformedData, {
      onError: () => {
        form.reset(data, { keepErrors: true });
      },
    });
  });

  const handleChangeFile: FileListViewerOnChangeHandler = (file, index) => {
    const { key } = files[index];
    updateCompanyDetails({ [key]: file });
  };

  const handleDeleteFile: FileListViewerOnDeleteHandler = (index) => {
    const { key } = files[index];
    updateCompanyDetails({ [key]: null });
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
            name="company_number"
            render={({ field }) => (
              <EditableInput
                type="text"
                title="Company Number"
                readOnly={!isEditMode}
                {...field}
                error={form.formState.errors[field.name]?.message}
                value={field.value ?? ''}
                className="uppercase"
              />
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <EditableInput
                type="text"
                title="Address"
                readOnly={!isEditMode}
                {...field}
                error={form.formState.errors[field.name]?.message}
                value={field.value ?? ''}
                className="capitalize"
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

          <EmailCell email={email ?? ''} className="w-full [&>.icon]:pr-6">
            <EditableInput
              type="email"
              title="Email"
              readOnly
              value={email ?? ''}
              className="!cursor-pointer"
            />
          </EmailCell>
        </div>
      </form>
    </FormProvider>
  );
}
