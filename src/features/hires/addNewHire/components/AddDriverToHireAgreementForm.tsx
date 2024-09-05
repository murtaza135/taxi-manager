import { Check, ChevronsUpDown } from 'lucide-react';
import { capitalCase } from 'change-case';
import { useWatch } from 'react-hook-form';
import { useMemo } from 'react';
import { cn } from '@/utils/cn';
import {
  FormProvider,
  Form,
  FormTitle,
  FormField,
  FormGroup,
  useZodForm,
  FormSection,
} from '@/ui/form/Form';
import { ReadOnlyInput } from '@/ui/form/Input';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/ui/Command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/ui/Popover';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
  DrawerDescription,
} from '@/ui/Drawer';
import { Button } from '@/ui/Button';
import { useMultiStepFormContext } from '@/ui/form/MultiStepForm';
import { addDriverToHireAgreementSchema, AddDriverToHireAgreementSchema } from '@/features/hires/addNewHire/schemas';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { FileListViewer } from '@/ui/files/FileListViewer';

const data = [
  { id: 1, name: 'Driver 1', email: 'driver1@test.com', phone_number: 'Driver A', picture_src: null },
  { id: 2, name: 'Driver 2', email: 'driver2@test.com', phone_number: 'Driver B', picture_src: null },
  { id: 3, name: 'Driver 3', email: 'driver3@test.com', phone_number: 'Driver C', picture_src: null },
  { id: 4, name: 'Driver 4', email: 'driver4@test.com', phone_number: 'Driver D', picture_src: null },
  { id: 5, name: 'Driver 5', email: 'driver5@test.com', phone_number: 'Driver E', picture_src: null },
];

export function AddDriverToHireAgreementForm() {
  const sm = useBreakpoint('sm');

  const {
    formState,
    prevStep,
    nextStep,
    updateFormState,
  } = useMultiStepFormContext<AddDriverToHireAgreementSchema>();

  const form = useZodForm({
    schema: addDriverToHireAgreementSchema,
    defaultValues: formState,
  });

  const selectedDriverId = useWatch({ control: form.control, name: 'driver_id' });
  const selectedDriver = useMemo(() => (
    data.find((driver) => driver.id === selectedDriverId)
  ), [selectedDriverId]);

  const handleSubmit = form.handleSubmit((formData) => {
    console.log(formData);
    updateFormState(formData);
    nextStep();
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  });

  const goPrevStep = () => {
    prevStep();
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  return (
    <FormProvider {...form}>
      <Form
        onSubmit={handleSubmit}
        className="w-[28.25rem] space-y-4"
      >
        <FormTitle>Driver</FormTitle>

        <FormField
          control={form.control}
          name="driver_id"
          render={({ field }) => {
            if (sm) {
              return (
                <FormGroup label="* Driver" className="flex flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          'w-[24.75rem] justify-between',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value > 0
                          ? capitalCase(data.find((driver) => driver.id === field.value)?.name ?? '')
                          : 'Select driver'}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[24.75rem] min-w-0 p-0">
                      <Command>
                        <CommandInput placeholder="Search driver..." />
                        <CommandList>
                          <CommandEmpty>No drivers found.</CommandEmpty>
                          <CommandGroup>
                            {data.map((driver) => (
                              <CommandItem
                                value={`${driver.id} ${driver.name} ${driver.email} ${driver.phone_number}`}
                                key={driver.id}
                                onSelect={() => {
                                  form.setValue(field.name, driver.id);
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    driver.id === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0',
                                  )}
                                />
                                {capitalCase(driver.name)}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormGroup>
              );
            }

            return (
              <FormGroup label="* Driver" className="flex flex-col">
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        'justify-between',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value > 0
                        ? capitalCase(data.find(
                          (driver) => driver.id === field.value,
                        )?.name ?? '')
                        : 'Select driver'}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent className="p-0 [&>div]:mb-3.5 border border-primary-dark dark:border-primary-light">
                    <DrawerTitle className="hidden">Select Driver</DrawerTitle>
                    <DrawerDescription className="hidden">
                      Select driver that you would like to attach to this hire agreement
                    </DrawerDescription>

                    <Command className="border-0 border-t rounded-t-none">
                      <CommandInput placeholder="Search driver..." />
                      <CommandList>
                        <CommandEmpty>No drivers found.</CommandEmpty>
                        <CommandGroup>
                          {data.map((driver) => (
                            <CommandItem
                              value={`${driver.id} ${driver.name} ${driver.email} ${driver.phone_number}`}
                              key={driver.id}
                              onSelect={() => {
                                form.setValue(field.name, driver.id);
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  driver.id === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0',
                                )}
                              />
                              {capitalCase(driver.name ?? '')}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </DrawerContent>
                </Drawer>
              </FormGroup>
            );
          }}
        />

        {selectedDriver && (
          <FormSection title="Driver Details" className="space-y-3">
            <FileListViewer
              files={[{
                key: `${selectedDriver.id}`,
                fileType: 'image',
                file: selectedDriver.picture_src ?? undefined,
              }]}
              className="py-2 [&_.other-file-display]:border-primary-dark [&_.other-file-display]:dark:border-primary-light [&_.file-error-display]:border-primary-dark [&_.file-error-display]:dark:border-primary-light"
            />
            <ReadOnlyInput title="Name" value={selectedDriver.name} className="capitalize " />
            <ReadOnlyInput title="Email" value={selectedDriver.email} />
            <ReadOnlyInput title="Phone Number" value={selectedDriver.phone_number} />
          </FormSection>
        )}

        <div className="pt-3 flex justify-between gap-3 flex-wrap-reverse">
          <Button type="button" variant="outline" onClick={goPrevStep}>Back</Button>
          <Button type="submit" variant="primary">Next</Button>
        </div>
      </Form>
    </FormProvider>
  );
}
