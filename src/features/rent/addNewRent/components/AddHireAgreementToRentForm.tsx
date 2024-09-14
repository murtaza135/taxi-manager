import { Check, ChevronsUpDown } from 'lucide-react';
import { capitalCase } from 'change-case';
import { useMemo, useState, useEffect } from 'react';
import { startOfToday } from 'date-fns';
import { useDebounceValue } from '@/hooks/useDebounceValue';
import { cn } from '@/utils/cn';
import {
  FormProvider,
  Form,
  FormTitle,
  FormField,
  FormGroup,
  useZodForm,
  FormSection,
  UseZodFormReturn,
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
import { addNewRentHireSchema, AddNewRentHireSchema, addNewRentSchema } from '@/features/rent/addNewRent/schemas';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { FileListViewer } from '@/ui/files/FileListViewer';
import { Spinner } from '@/ui/Spinner';
import { useFetchOnScroll } from '@/hooks/useFetchOnScroll';
import { useNonSuspenseHires, Hire } from '@/features/hires/general/hooks/useHires';
import { useSettings } from '@/features/settings/hooks/useSettings';
import { getNextDateFromDay } from '@/utils/date/days';

export function AddHireAgreementToRentForm() {
  const sm = useBreakpoint('sm');
  const [search, setSearch, originalSearch] = useDebounceValue<string>('', 500);
  const [open, setOpen] = useState<boolean>(false);
  const { data: settings } = useSettings();
  const { rent_day } = settings;

  const {
    data,
    isLoading,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
  } = useNonSuspenseHires({ search });

  const flatData = useMemo(
    () => data?.pages?.flatMap((page) => page.data) ?? [],
    [data],
  );

  const fetchedCount = flatData.length;
  const fetchableCount = data?.pages[0].count ?? 0;

  const {
    formState,
    prevStep,
    nextStep,
    updateFormState,
  } = useMultiStepFormContext<AddNewRentHireSchema>();

  const [selectedHire, setSelectedHire] = useState<Hire | null>(
    () => flatData.find((hire) => hire.id === formState.hire_id) ?? null,
  );

  const form = useZodForm({
    schema: addNewRentHireSchema,
    defaultValues: formState,
  });

  const { ref, fetchOnScroll } = useFetchOnScroll<React.ElementRef<typeof CommandList>>({
    fetchNext: fetchNextPage,
    hasMore: fetchedCount < fetchableCount,
    fetchCondition: !isFetchingNextPage,
    scrollThreshold: 500,
  });

  useEffect(() => {
    void fetchOnScroll();
  }, [fetchOnScroll]);

  const handleSubmit = form.handleSubmit((formData) => {
    updateFormState(formData);
    nextStep();
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  });

  const goPrevStep = () => {
    prevStep();
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const handleSelectHire = (id: number) => {
    setOpen(false);

    const selected = flatData.find((hire) => hire.id === id) ?? null;
    const amount = selected?.rent_amount.toString() ?? '';
    const start_date = startOfToday().toString();
    const end_date = getNextDateFromDay(rent_day).toString();

    const totalForm = form as unknown as UseZodFormReturn<typeof addNewRentSchema>;
    totalForm.setValue('hire_id', id);
    totalForm.setValue('amount', amount);
    totalForm.setValue('start_date', start_date);
    totalForm.setValue('end_date', end_date);

    setSelectedHire(selected);
  };

  return (
    <FormProvider {...form}>
      <Form
        onSubmit={handleSubmit}
        className="w-[28.25rem] space-y-4"
      >
        <FormTitle>Hire</FormTitle>

        <FormField
          control={form.control}
          name="hire_id"
          render={({ field }) => {
            if (sm) {
              return (
                <FormGroup label="* Hire" className="flex flex-col">
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          'w-[24.75rem] justify-between',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {selectedHire
                          ? `${selectedHire.taxi_number_plate.toUpperCase()}${selectedHire.taxi_licence_phc_number ? ` (${selectedHire.taxi_licence_phc_number.toUpperCase()})` : ''} - ${capitalCase(selectedHire.driver_name)}`
                          : 'Select hire'}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[24.75rem] min-w-0 p-0">
                      <Command shouldFilter={false} loop>
                        <CommandInput
                          placeholder="Search hire..."
                          value={originalSearch}
                          onValueChange={setSearch}
                          onClickClear={() => setSearch('')}
                        />

                        <CommandList ref={ref} onScroll={() => fetchOnScroll()}>
                          {!isLoading && <CommandEmpty>No hires found.</CommandEmpty>}

                          {isLoading && (
                            <span className="pt-2.5 center">
                              <Spinner size="sm" />
                            </span>
                          )}

                          <CommandGroup>
                            {!isLoading && flatData.map((hire) => (
                              <CommandItem
                                value={`${hire.id}`}
                                key={hire.id}
                                onSelect={() => handleSelectHire(hire.id)}
                                disabled={isFetching}
                                className={cn(isFetching && 'data-[disabled=true]:opacity-100 animate-pulse-opaque')}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    hire.id === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0',
                                  )}
                                />
                                {hire.taxi_number_plate.toUpperCase()}{hire.taxi_licence_phc_number ? ` (${hire.taxi_licence_phc_number.toUpperCase()})` : ''} - {capitalCase(hire.driver_name)}
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
              <FormGroup label="* Hire" className="flex flex-col">
                <Drawer open={open} onOpenChange={setOpen}>
                  <DrawerTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        'justify-between',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {selectedHire
                        ? `${selectedHire.taxi_number_plate.toUpperCase()}${selectedHire.taxi_licence_phc_number ? ` (${selectedHire.taxi_licence_phc_number.toUpperCase()})` : ''} - ${capitalCase(selectedHire.driver_name)}`
                        : 'Select hire'}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent className="p-0 [&>div]:mb-3.5 border border-primary-dark dark:border-primary-light">
                    <DrawerTitle className="hidden">Select Hire</DrawerTitle>
                    <DrawerDescription className="hidden">
                      Select hire that you would like to attach to this hire agreement
                    </DrawerDescription>

                    <Command shouldFilter={false} loop className="border-0 border-t rounded-none">
                      <CommandInput
                        placeholder="Search hire..."
                        value={originalSearch}
                        onValueChange={setSearch}
                        onClickClear={() => setSearch('')}
                      />

                      <CommandList ref={ref} onScroll={() => fetchOnScroll()}>
                        {!isLoading && <CommandEmpty>No hires found.</CommandEmpty>}

                        {isLoading && (
                          <span className="pt-2.5 center">
                            <Spinner size="sm" />
                          </span>
                        )}

                        <CommandGroup>
                          {!isLoading && flatData.map((hire) => (
                            <CommandItem
                              value={`${hire.id}`}
                              key={hire.id}
                              onSelect={() => handleSelectHire(hire.id)}
                              disabled={isFetching}
                              className={cn(isFetching && 'data-[disabled=true]:opacity-100 animate-pulse-opaque')}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  hire.id === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0',
                                )}
                              />
                              {hire.taxi_number_plate.toUpperCase()}{hire.taxi_licence_phc_number ? ` (${hire.taxi_licence_phc_number.toUpperCase()})` : ''} - {capitalCase(hire.driver_name)}
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

        {selectedHire && (
          <FormSection title="Hire Details" className="space-y-3">
            <FileListViewer
              files={[
                {
                  key: 'driver',
                  title: 'Driver',
                  fileType: 'image',
                  file: selectedHire.driver_picture_src ?? undefined,
                },
                {
                  key: 'taxi',
                  title: 'Taxi',
                  fileType: 'image',
                  file: selectedHire.taxi_picture_src ?? undefined,
                },
              ]}
              className="py-2 [&_.other-file-display]:border-primary-dark [&_.other-file-display]:dark:border-primary-light [&_.file-error-display]:border-primary-dark [&_.file-error-display]:dark:border-primary-light"
            />
            <ReadOnlyInput title="Number Plate" value={selectedHire.taxi_number_plate} className="capitalize " />
            <ReadOnlyInput title="PH Number" value={selectedHire.taxi_licence_phc_number ?? ''} />
            <ReadOnlyInput title="Driver" value={selectedHire.driver_name} />
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
