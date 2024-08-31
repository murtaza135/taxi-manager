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
import { updateTaxiInsuranceSchema, updateTaxiInsuranceTransformer } from '@/features/taxis/taxiDetails/schemas';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '@/ui/DropdownMenu';
import { useTaxiInsuranceDetails } from '@/features/taxis/general/hooks/useTaxiInsuranceDetails';
import { useUpdateTaxiInsuranceDetails } from '@/features/taxis/general/hooks/useUpdateTaxiInsuranceDetails';
import { Checkbox } from '@/ui/form/Checkbox';
import { cn } from '@/utils/cn';

// TODO PictureViewer for documents

export function TaxiInsuranceDetailsSection() {
  const params = useParams();
  const id = Number(params.id);
  const { data } = useTaxiInsuranceDetails(id);
  const pictureInputId = useId();
  const isRetiredCheckboxId = useId();
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const { mutate: updateTaxiInsurance } = useUpdateTaxiInsuranceDetails();

  const form = useZodForm({
    schema: updateTaxiInsuranceSchema,
    values: data,
  });

  const handleSubmitUpdate = form.handleSubmit((formData) => {
    setEditMode(false);
    const transformedData = updateTaxiInsuranceTransformer(formData);

    updateTaxiInsurance({ id: data.id, ...transformedData }, {
      onError: () => {
        form.reset(data, { keepErrors: true });
      },
    });
  });

  const handleEditPicture: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const insurance = event.target.files?.[0];
    updateTaxiInsurance({ id: data.id, insurance });
  };

  const handleDeletePicture: React.MouseEventHandler<HTMLButtonElement> = () => {
    updateTaxiInsurance({ id: data.id, insurance: null });
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
              <Avatar className="w-24 h-24 xs:w-28 xs:h-28 sm:!w-40 sm:!h-40 relative cursor-pointer select-none after:content-[''] after:absolute after:w-full after:h-full group-hover:after:bg-achromatic-dark/50">
                {data.document_src && (
                  <AvatarImage
                    src={data.document_src}
                    alt={`taxi-${data.id}`}
                  />
                )}
                <AvatarPersistentFallback className="w-24 h-24 xs:w-28 xs:h-28 sm:!w-40 sm:!h-40 text-2xl sm:text-3xl">
                  {extractInitials(data.policy_number)}
                </AvatarPersistentFallback>
              </Avatar>
              <p className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-60 text-xl xs:text-2xl cursor-pointer">
                <MdModeEdit />
              </p>
            </DropdownMenuTrigger>

            <input
              id={pictureInputId}
              aria-label="picture"
              className="hidden"
              type="file"
              onChange={handleEditPicture}
            />

            <DropdownMenuContent className="min-w-[125px]">
              <DropdownMenuItem>
                <label htmlFor={pictureInputId} className="flex justify-start items-center gap-2 cursor-pointer">
                  <span className="text-lg"><MdModeEdit /></span>
                  <span>Edit</span>
                </label>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button
                  variant="ghost"
                  className="p-0 gap-2 font-normal"
                  onClick={handleDeletePicture}
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
