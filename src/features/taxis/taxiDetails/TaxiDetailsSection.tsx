import { useParams } from 'react-router-dom';
import { MdModeEdit } from 'react-icons/md';
import { BiSave } from 'react-icons/bi';
import { useId, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useTaxiDetails } from '@/features/taxis/general/hooks/useTaxiDetails';
import { Avatar, AvatarPersistentFallback, AvatarImage } from '@/ui/Avatar';
import { extractInitials } from '@/utils/string/extractInitials';
import { EditableInput } from '@/ui/form/Input';
import { Button } from '@/ui/Button';
import { toDateInputString } from '@/utils/date/toDateInputString';
import { useUpdateTaxiDetails } from '@/features/taxis/general/hooks/useUpdateTaxiDetails';
import { useZodForm, FormProvider, FormField } from '@/ui/form/Form';
import { updateTaxiDetailsTransformer, updateTaxiDetailsSchema } from '@/features/taxis/taxiDetails/schemas';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '@/ui/DropdownMenu';

// TODO PictureViewer for picture and logbook document

export function TaxiDetailsSection() {
  const params = useParams();
  const id = Number(params.id);
  const { data } = useTaxiDetails(id);
  const pictureInputId = useId();
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const { mutate: updateTaxi } = useUpdateTaxiDetails();

  const form = useZodForm({
    schema: updateTaxiDetailsSchema,
    values: data,
  });

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

  const handleEditPicture: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const picture = event.target.files?.[0];
    updateTaxi({ id, picture });
  };

  const handleDeletePicture: React.MouseEventHandler<HTMLButtonElement> = () => {
    updateTaxi({ id, picture: null });
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
                {data.picture_src && (
                  <AvatarImage
                    src={data.picture_src}
                    alt={`taxi-${data.id}`}
                  />
                )}
                <AvatarPersistentFallback className="w-24 h-24 xs:w-28 xs:h-28 sm:!w-40 sm:!h-40 text-2xl sm:text-3xl">
                  {extractInitials(data.number_plate)}
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
                value={field.value ?? ''}
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
                value={field.value ?? ''}
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
