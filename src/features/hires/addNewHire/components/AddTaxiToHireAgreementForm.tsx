import { Check, ChevronsUpDown } from 'lucide-react';
import { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import { IoIosWarning } from 'react-icons/io';
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
import { addTaxiToHireAgreementSchema, AddTaxiToHireAgreementSchema } from '@/features/hires/addNewHire/schemas';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { FileListViewer } from '@/ui/files/FileListViewer';
import { useNonSuspenseTaxis, Taxi } from '@/features/taxis/general/hooks/useTaxis';
import { Spinner } from '@/ui/Spinner';
import { useFetchOnScroll } from '@/hooks/useFetchOnScroll';

export function AddTaxiToHireAgreementForm() {
  const sm = useBreakpoint('sm');
  const [search, setSearch, originalSearch] = useDebounceValue<string>('', 500);
  const [open, setOpen] = useState<boolean>(false);

  const {
    data,
    isLoading,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
  } = useNonSuspenseTaxis({ search });

  const flatData = useMemo(
    () => data?.pages?.flatMap((page) => page.data) ?? [],
    [data],
  );

  const fetchedCount = flatData.length;
  const fetchableCount = data?.pages[0].count ?? 0;

  const {
    formState,
    nextStep,
    updateFormState,
  } = useMultiStepFormContext<AddTaxiToHireAgreementSchema>();

  const [selectedTaxi, setSelectedTaxi] = useState<Taxi | null>(
    () => flatData.find((taxi) => taxi.id === formState.taxi_id) ?? null,
  );

  const form = useZodForm({
    schema: addTaxiToHireAgreementSchema,
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

  const handleSelectTaxi = (id: number) => {
    setOpen(false);
    const selected = flatData.find((taxi) => taxi.id === id) ?? null;
    form.setValue('taxi_id', id);
    form.setValue('number_plate', selected?.number_plate ?? '');
    form.setValue('phc_number', selected?.phc_number ?? '');
    form.setValue('make', selected?.make ?? '');
    form.setValue('model', selected?.model ?? '');
    form.setValue('colour', selected?.colour ?? '');
    setSelectedTaxi(selected);
  };

  return (
    <FormProvider {...form}>
      <Form
        onSubmit={handleSubmit}
        className="w-[28.25rem] space-y-4"
      >
        <FormTitle>Taxi</FormTitle>

        <FormField
          control={form.control}
          name="taxi_id"
          render={({ field }) => {
            if (sm) {
              return (
                <FormGroup label="* Taxi" className="flex flex-col">
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
                        {selectedTaxi
                          ? selectedTaxi.number_plate.toUpperCase()
                          : 'Select taxi'}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[24.75rem] min-w-0 p-0">
                      <Command shouldFilter={false} loop>
                        <CommandInput
                          placeholder="Search taxi..."
                          value={originalSearch}
                          onValueChange={setSearch}
                          onClickClear={() => setSearch('')}
                        />

                        <CommandList ref={ref} onScroll={() => fetchOnScroll()}>
                          {!isLoading && <CommandEmpty>No taxis found.</CommandEmpty>}

                          {isLoading && (
                            <span className="pt-2.5 center">
                              <Spinner size="sm" />
                            </span>
                          )}

                          <CommandGroup>
                            {!isLoading && flatData.map((taxi) => (
                              <CommandItem
                                value={`${taxi.id}`}
                                key={taxi.id}
                                onSelect={() => handleSelectTaxi(taxi.id)}
                                disabled={isFetching}
                                className={cn(isFetching && 'data-[disabled=true]:opacity-100 animate-pulse-opaque')}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    taxi.id === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0',
                                  )}
                                />
                                {taxi.number_plate.toUpperCase()}
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
              <FormGroup label="* Taxi" className="flex flex-col">
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
                      {selectedTaxi
                        ? selectedTaxi.number_plate.toUpperCase()
                        : 'Select taxi'}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent className="p-0 [&>div]:mb-3.5 border border-primary-dark dark:border-primary-light">
                    <DrawerTitle className="hidden">Select Taxi</DrawerTitle>
                    <DrawerDescription className="hidden">
                      Select taxi that you would like to attach to this hire agreement
                    </DrawerDescription>

                    <Command shouldFilter={false} loop className="border-0 border-t rounded-none">
                      <CommandInput
                        placeholder="Search taxi..."
                        value={originalSearch}
                        onValueChange={setSearch}
                        onClickClear={() => setSearch('')}
                      />

                      <CommandList ref={ref} onScroll={() => fetchOnScroll()}>
                        {!isLoading && <CommandEmpty>No taxis found.</CommandEmpty>}

                        {isLoading && (
                          <span className="pt-2.5 center">
                            <Spinner size="sm" />
                          </span>
                        )}

                        <CommandGroup>
                          {!isLoading && flatData.map((taxi) => (
                            <CommandItem
                              value={`${taxi.id}`}
                              key={taxi.id}
                              onSelect={() => handleSelectTaxi(taxi.id)}
                              disabled={isFetching}
                              className={cn(isFetching && 'data-[disabled=true]:opacity-100 animate-pulse-opaque')}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  taxi.id === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0',
                                )}
                              />
                              {taxi.number_plate.toUpperCase()}
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

        {selectedTaxi && (
          <FormSection title="Taxi Details" className="space-y-3">
            <FileListViewer
              files={[{
                key: `${selectedTaxi.id}`,
                fileType: 'image',
                file: selectedTaxi.picture_src ?? undefined,
              }]}
              className="py-2 [&_.other-file-display]:border-primary-dark [&_.other-file-display]:dark:border-primary-light [&_.file-error-display]:border-primary-dark [&_.file-error-display]:dark:border-primary-light"
            />
            <ReadOnlyInput title="Number Plate" value={selectedTaxi.number_plate} className="uppercase" />
            <ReadOnlyInput title="PH Number" value={selectedTaxi.phc_number ?? ''} className="uppercase" />
            <ReadOnlyInput title="Make" value={selectedTaxi.make} className="capitalize" />
            <ReadOnlyInput title="Model" value={selectedTaxi.model} className="capitalize" />
            <ReadOnlyInput title="Colour" value={selectedTaxi.colour} className="capitalize" />

            {!!selectedTaxi.hire_agreement_id && (
              <div className="flex gap-2 border bg-yellow-300/50 border-yellow-500 text-achromatic-dark dark:bg-yellow-700/30 dark:text-achromatic-lighter dark:border-yellow-500 rounded-lg px-3 py-2 text-sm">
                <IoIosWarning className="shrink-0 translate-y-[0.19rem] text-yellow-500 dark:text-yellow-500" />
                <p>This taxi is already a part of an in-progress <Link to={`/hire/${selectedTaxi.hire_agreement_id}`} className="font-bold hover:opacity-50">Hire Agreement <FiEye className="inline text-xs -translate-y-[1px] -translate-x-[1px] mr-[3px]" /></Link> with <Link to={`/driver/${selectedTaxi.driver_id}`} className="font-bold hover:opacity-50">{selectedTaxi.driver_name ?? 'this driver'} <FiEye className="inline text-xs -translate-y-[1px] -translate-x-[1px] mr-[3px]" /></Link>.</p>
              </div>
            )}
          </FormSection>
        )}

        <div className="pt-3 flex justify-end gap-3 flex-wrap-reverse">
          <Button type="submit" variant="primary">Next</Button>
        </div>
      </Form>
    </FormProvider>
  );
}
