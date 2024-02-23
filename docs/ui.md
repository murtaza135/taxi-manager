# UI Components
- [UI Components](#ui-components)
  - [DataView](#dataview)
  - [Backdrop](#backdrop)
  - [Form](#form)
  - [MultiStepForm](#multistepform)
  - [Accordion](#accordion)
  - [Slide](#slide)
  - [Tooltip](#tooltip)

<br>

## DataView
### General Usage
```tsx
// @/columns.tsx
import { ColumnDef } from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/ui/DropdownMenu';
import {
  DataViewCheckbox,
  DataViewHeader,
  DataViewCardMainDataMapper,
  DataViewOpenPage,
} from '@/ui/DataView';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/Avatar';
import { IoEllipsisVertical } from 'react-icons/io5';

export type CustomData = {
  id: string;
  name: string;
  avatar?: string;
};

// one ColumnDef for the table layout
export const tableColumns: ColumnDef<CustomData>[] = [
  {
    id: 'select',
    header: ({ table }) => <DataViewCheckbox.Header table={table} />,
    cell: ({ row }) => <DataViewCheckbox.Cell dataRow={row} />,
    enableSorting: false,
    enableHiding: false,
    enableGlobalFilter: false,
  },
  {
    id: 'openPage',
    header: '',
    cell: () => <DataViewOpenPage to="/temp/1" />,
    enableSorting: false,
    enableHiding: false,
    enableGlobalFilter: false,
  },
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataViewHeader column={column} header="Name" />,
  },
  {
    accessorKey: 'avatar',
    header: 'Avatar',
    cell: ({ row }) => (
      <Avatar className="hover:opacity-65 transition-opacity">
        <AvatarImage src={row.getValue('avatar')} alt="user" />
        <AvatarFallback className="dark:text-achromatic-light">Cn</AvatarFallback>
      </Avatar>
    ),
  },
  {
    id: 'options',
    cell: ({ row }) => {
      const data = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="cursor-pointer hover:opacity-70 transition-opacity">
              <span className="sr-only">Options</span>
              <IoEllipsisVertical />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(data.id)}
            >
              Copy ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// another ColumnDef for the grid layout
export const gridColumns: ColumnDef<CustomData>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'avatar',
    header: 'Avatar',
  },
  {
    id: 'options',
    cell: ({ row }) => {
      const data = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="translate-x-2">
            <div className="cursor-pointer hover:opacity-70 transition-opacity">
              <span className="sr-only">Options</span>
              <IoEllipsisVertical />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(data.id)}
            >
              Copy ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const mapper: DataViewCardMainDataMapper = {
  title: 'name',
  avatar: 'avatar',
  options: 'options',
  subtitle: 'subtitle', // if you have a subtitle property in ColumnDef
  image: 'image', // if you have an image property in ColumnDef
} as const;

export const columns = {
  table: tableColumns,
  grid: gridColumns,
} as const;
```

```ts
// @/data.ts
import { CustomData } from '@/columns';
import person from '@/person.jpg';

export const data: CustomData[] = [
  {
    id: '1',
    name: 'John Doe',
    avatar: person,
  },
  {
    id: '2',
    name: 'Jane Doe',
    avatar: person,
  },
];
```

```tsx
// @/Page.tsx
import { useState } from 'react';
import { 
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
} from '@tanstack/react-table';
import {
  DataViewTopBar,
  DataViewPagination,
  DataViewLayoutType,
  DataViewLayout,
} from '@/ui/DataView';
import { columns, mapper } from '@/columns';
import { data } from '@/data';

export default function Page() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [layout, setLayout] = useState<DataViewLayoutType>('table');
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data,
    columns: columns[layout],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    state: { sorting, columnFilters, rowSelection, globalFilter },
  });

  return (
    <div className="flex flex-col gap-3">
      <DataViewTopBar
        table={table}
        showSortButton
        showVisibilityButton
        showRoesPerPageButton
        layout={layout}
        onChangeLayout={setLayout}
        filter={globalFilter}
        onChangeFilter={setGlobalFilter}
      />
      <DataViewLayout
        layout={layout}
        table={table}
        mapper={mapper}
      />
      <DataViewPagination
        table={table}
        showSelectedRows
        showPageCount
        showPageButtons
      />
    </div>
  );
}
```

### Lower Level Components
```tsx
export function LowerLevelComponents() {
  // hooks
  // ...

  return (
    <>
      <DataViewSearchFilter filter={filter} onChangeFilter={onChangeFilter} />
      <DataViewColumnVisibilityDropdown table={table} />
      <DataViewColumnSortDropdown table={table} />
      <DataViewRowsPerPageDropdown table={table} />
      <DataViewLayoutDropdown layout={layout} onChangeLayout={onChangeLayout} />
    </>
  )
}
```

<br>

## Backdrop
```tsx
// @/Page.tsx
import { useState } from "react";
import { Backdrop } from '@/ui/Backdrop';

export default function Page() {
  const [isOpen, setIsOpen] = useState();

  return (
    <Backdrop isOpen={isOpen} onClose={() => setIsOpen(false)} />
  )
}
```

<br>

## Form
```ts
// @/schema.ts
import { z } from 'zod';

export const FormSchema = z.object({
  username: z.string().min(5, {
    message: 'Username must be at least 5 characters.',
  }),
  password: z.string().min(5, {
    message: 'Password must be at least 5 characters.',
  })
});

export type FormSchemaType = z.infer<typeof FormSchema>;
```

```tsx
// @/Page.tsx
import {
  FormProvider,
  Form,
  FormTitle,
  FormField,
  FormGroup,
  useZodForm,
} from '@/ui/Form';
import { Input } from '@/ui/Input';
import { Button } from '@/ui/Button';
import { FormSchema } from "@/schema"

export default function Page() {
  const form = useZodForm({
    schema: FormSchema,
    defaultValues: { username: '', password: '' },
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <FormProvider {...form}>
      <Form onSubmit={onSubmit} className="w-full max-w-[32rem] space-y-4">
        <FormTitle>Form</FormTitle>

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormGroup label="Username">
              <Input placeholder="Username" {...field} />
            </FormGroup>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormGroup label="Password">
              <Input placeholder="Password" {...field} />
            </FormGroup>
          )}
        />

        <Button type="submit">Submit</Button>
      </Form>
    </FormProvider>
  )
}
```

<br>

## MultiStepForm
```tsx
// @/Page.tsx
import {
  MultiStepForm,
  MultiStepFormItems,
  MultiStepFormItem,
  MultiStepFormStepper,
  MultiStepFormStepperItem,
} from '@/ui/MultiStepForm';
import { Form1 } from '@/Form1';
import { Form2 } from '@/Form2';
import { Form3 } from '@/Form3';

export default function Page() {
  return (
    <MultiStepForm min={1} max={3}>
      <MultiStepFormStepper>
        <MultiStepFormStepperItem step={1} title="Form 1" />
        <MultiStepFormStepperItem step={2} title="Form 2" />
        <MultiStepFormStepperItem step={3} title="Form 3" />
      </MultiStepFormStepper>

      <MultiStepFormItems className="flex justify-center items-start">
        <MultiStepFormItem step={1}><Form1 /></MultiStepFormItem>
        <MultiStepFormItem step={2}><Form2 /></MultiStepFormItem>
        <MultiStepFormItem step={3}><Form3 /></MultiStepFormItem>
      </MultiStepFormItems>
    </MultiStepForm>
  );
}
```

<br>

## Accordion
```tsx
// @/Page.tsx
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionCollapsibleContent,
  AccordionNonCollapsibleContent,
} from '@/ui/Accordion';

export default function Page() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="1">
        <AccordionNonCollapsibleContent>
          Non-Collapsible Content
        </AccordionNonCollapsibleContent>
      </AccordionItem>

      <AccordionItem value="2">
        <AccordionTrigger>Trigger for Collapsible Content</AccordionTrigger>
        <AccordionCollapsibleContent>
          Collapsible Content
        </AccordionCollapsibleContent>
      </AccordionItem>
    </Accordion>
  );
}
```

<br>

## Slide
```tsx
// @/Page.tsx
import { useState } from "react";
import {
  Slide,
  SlideItems,
  SlideItem,
  SlideTabs,
  SlideTab,
  SlideSelect,
  SlideSelectItem,
} from '@/ui/Slide';

export default function Page() {
  const [showSelect, setShowSelect] = useState(false);

  return (
    <Slide min={1} max={4} className="flex flex-col">
      {showSelect
        ? (
          <SlideSelect>
            <SlideSelectItem index={1}>Option 1</SlideSelectItem>
            <SlideSelectItem index={2}>Option 2</SlideSelectItem>
            <SlideSelectItem index={3}>Option 3</SlideSelectItem>
            <SlideSelectItem index={4}>Option 4</SlideSelectItem>
          </SlideSelect>
        )
        : (
          <SlideTabs>
            <SlideTab index={1}>Option 1</SlideTab>
            <SlideTab index={2}>Option 2</SlideTab>
            <SlideTab index={3}>Option 3</SlideTab>
            <SlideTab index={4}>Option 4</SlideTab>
          </SlideTabs>
        )}

      <SlideItems className="flex-grow">
        <SlideItem index={1}>1</SlideItem>
        <SlideItem index={2}>2</SlideItem>
        <SlideItem index={3}>3</SlideItem>
        <SlideItem index={4}>4</SlideItem>
      </SlideItems>
    </Slide>
  );
}
```

<br>

## Tooltip
```tsx
// @/Page.tsx
import { TooltipWrapper } from '@/ui/Tooltip';

export default function Page() {
  return (
    <TooltipWrapper text="Tooltip Text on Hover">
      <p>Some Content</p>
    </TooltipWrapper>
  );
}
```