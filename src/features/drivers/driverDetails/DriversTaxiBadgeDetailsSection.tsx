import { useParams } from 'react-router-dom';
import { MdModeEdit } from 'react-icons/md';
import { BiSave } from 'react-icons/bi';
import { useId, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { Avatar, AvatarPersistentFallback, AvatarImage } from '@/ui/Avatar';
import { extractInitials } from '@/utils/string/extractInitials';
import { EditableInput } from '@/ui/form/Input';
import { Button } from '@/ui/Button';
import { toDateInputString } from '@/utils/date/toDateInputString';
import { useZodForm, FormProvider, FormField } from '@/ui/form/Form';
import { updateDriversTaxiBadgeDetailsSchema, updateDriversTaxiBadgeTransformer } from '@/features/drivers/driverDetails/schemas';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '@/ui/DropdownMenu';
import { useDriversTaxiBadgeDetails } from '@/features/drivers/general/hooks/useDriversTaxiBadgeDetails';
import { useUpdateDriversTaxiBadgeDetails } from '@/features/drivers/general/hooks/useUpdateDriversTaxiBadgeDetails';

export function DriversTaxiBadgeDetailsSection() {
  const params = useParams();
  const driver_id = Number(params.id);
  const { data: taxiBadge } = useDriversTaxiBadgeDetails(driver_id);
  const documentInputId = useId();
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const { mutate: updateTaxiBadge } = useUpdateDriversTaxiBadgeDetails();

  const form = useZodForm({
    schema: updateDriversTaxiBadgeDetailsSchema,
    values: taxiBadge,
  });

  const handleSubmitUpdate = form.handleSubmit((formData) => {
    setEditMode(false);
    const transformedData = updateDriversTaxiBadgeTransformer(formData);

    // TODO check if data has actually been changed (not just isDirty?) and only then mutate
    updateTaxiBadge({ id: taxiBadge.id, driver_id, ...transformedData }, {
      onError: () => {
        form.reset(taxiBadge, { keepErrors: true });
      },
    });
  });

  const handleEditDocument: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const document = event.target.files?.[0];
    updateTaxiBadge({ id: taxiBadge.id, driver_id, document });
  };

  const handleDeleteDocument: React.MouseEventHandler<HTMLButtonElement> = () => {
    updateTaxiBadge({ id: taxiBadge.id, driver_id, document: null });
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex justify-start items-start gap-8 xs:gap-10 sm:gap-14 flex-col xs:flex-row py-3 px-2"
        onSubmit={handleSubmitUpdate}
      >
        <div className="flex flex-row xs:flex-col justify-start items-start gap-4 flex-shrink-0">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="group relative outline-none">
              {/* TODO change avatar to img */}
              <Avatar className="w-24 h-[6.25rem] xs:w-28 xs:h-[7.25rem] sm:!w-40 sm:!h-[10.25rem] rounded-none relative cursor-pointer select-none after:content-[''] after:absolute after:w-full after:h-full group-hover:after:bg-achromatic-dark/50">
                {taxiBadge.document_src && (
                  <AvatarImage
                    src={taxiBadge.document_src}
                    alt={`drivers-licence-${taxiBadge.id}`}
                  />
                )}
                <AvatarPersistentFallback className="w-24 h-24 xs:w-28 xs:h-28 sm:!w-40 sm:!h-40 text-2xl sm:text-3xl">
                  {extractInitials(taxiBadge.badge_number)}
                </AvatarPersistentFallback>
              </Avatar>
              <p className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-60 text-xl xs:text-2xl cursor-pointer">
                <MdModeEdit />
              </p>
            </DropdownMenuTrigger>

            <input
              id={documentInputId}
              aria-label="licence-document"
              className="hidden"
              type="file"
              onChange={handleEditDocument}
            />

            <DropdownMenuContent className="min-w-[125px]">
              <DropdownMenuItem>
                <label htmlFor={documentInputId} className="flex justify-start items-center gap-2 cursor-pointer">
                  <span className="text-lg"><MdModeEdit /></span>
                  <span>Edit</span>
                </label>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button
                  variant="ghost"
                  className="p-0 gap-2 font-normal"
                  onClick={handleDeleteDocument}
                >
                  <span className="text-base"><FaTrashAlt /></span>
                  <span>Delete</span>
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

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
            name="badge_number"
            render={({ field }) => (
              <EditableInput
                type="text"
                title="Badge Number"
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
