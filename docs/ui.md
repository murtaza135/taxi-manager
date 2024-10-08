# UI Components
- [UI Components](#ui-components)
  - [DataView](#dataview)
  - [Backdrop](#backdrop)
  - [Form](#form)
  - [MultiStepForm](#multistepform)
  - [Accordion](#accordion)
  - [Swiper](#swiper)

<br>

## DataView
### General Usage
```tsx
// @/columns.tsx
import { ColumnDef } from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import { IoEllipsisVertical } from 'react-icons/io5';
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
  DataViewOpenPageButton,
} from '@/ui/DataView';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/Avatar';
import { Button } from '@/ui/Button';

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
    cell: ({ row }) => <DataViewOpenPageButton to={`/custom/${row.original.id}`} />,
    enableSorting: false,
    enableHiding: false,
    enableGlobalFilter: false,
  },
  {
    id: "id",
    accessorKey: 'id',
    header: 'ID',
  },
  {
    id: "name",
    accessorKey: 'name',
    header: ({ column }) => <DataViewHeader column={column} header="Name" />,
  },
  {
    id: "avatar",
    accessorKey: 'avatar',
    header: 'Avatar',
    cell: ({ row }) => (
      <Avatar>
        <AvatarImage src={row.getValue('avatar')} alt="user" />
        <AvatarFallback>Cn</AvatarFallback>
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
    id: "name",
    accessorKey: 'name',
    header: 'Name',
  },
  {
    id: "avatar",
    accessorKey: 'avatar',
    header: 'Avatar',
  },
  {
    id: 'optionsTop',
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
  {
    id: 'optionsBottom',
    cell: ({ row }) => {
      const driver = row.original;

      return (
        <Link to={`/driver/${driver.id}`} className="w-full">
          <Button className="w-full">Open</Button>
        </Link>
      );
    },
  },
];

export const mapper: DataViewCardMainDataMapper = {
  title: 'name',
  avatar: 'avatar',
  optionsTop: 'optionsTop',
  optionsBottom: 'optionsBottom',
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
import person from '@/person.jpg'; // mock image

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
  getFilteredRowModel,
  SortingState,
  ColumnFiltersState,
  PaginationState,
  RowSelectionState,
  LayoutState,
} from '@tanstack/react-table';
import {
  DataView,
  DataViewTopBar,
  DataViewTopBarSection,
  DataViewTable,
  DataViewGrid,
  DataViewLayoutDropdown,
  DataViewDeleteSelectedRowsButton,
  DataViewRowSelectionCount,
  DataViewSearchPopover,
  DataViewColumnVisibilityDropdown,
} from '@/ui/dataview/DataView';
import { columns, mapper } from '@/columns';
import { data } from '@/data';

export default function Page() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 50 });
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [layout, setLayout] = useState<LayoutState>('table');

  const fetchedCount = data.length;
  const fetchableCount = data.length;

  const table = useReactTable({
    data,
    columns: columns[layout],
    getRowId: ({ id }) => `${id}`,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    state: { sorting, columnFilters, pagination, rowSelection, globalFilter },
    meta: { layout, onLayoutChange: setLayout, fetchedCount, fetchableCount },
  });

  return (
    <DataView table={table}>
      <DataViewTopBar>
        <DataViewTopBarSection>
          <Button size="sm" shape="circle" className="text-xl">+</Button>
          <DataViewSearchPopover />
          <DataViewLayoutDropdown />
          <DataViewColumnVisibilityDropdown />
          <Button variant="ghost" size="auto" className="text-xl center" onClick={() => refetch()}>
            <IoReload />
          </Button>
          <DataViewDeleteSelectedRowsButton onDelete={(ids) => deleteSelectedRows(ids)} />
        </DataViewTopBarSection>
        <DataViewTopBarSection>
          <DataViewRowSelectionCount />
        </DataViewTopBarSection>
      </DataViewTopBar>
      {layout === 'table' && <DataViewTable />}
      {layout === 'grid' && <DataViewGrid mapper={mapper} />}
    </DataView>
  );
}
```

<br>

## Backdrop
```tsx
// @/Page.tsx
import { useState, ReactNode } from "react";
import { Backdrop } from '@/ui/Backdrop';

export default function Page({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Backdrop isOpen={isOpen} onClose={() => setIsOpen(false)}>
      {children}
    </Backdrop>
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

## Swiper
```tsx
// @/Page.tsx
import { useState } from "react";
import {
  Swiper,
  SwiperItems,
  SwiperItem,
  SwiperTabs,
  SwiperTab,
  SwiperSelect,
  SwiperSelectItem,
} from '@/ui/Swiper';

export default function Page() {
  const [showSelect, setShowSelect] = useState(false);

  return (
    <Swiper min={1} max={4} className="flex flex-col">
      {showSelect
        ? (
          <SwiperSelect>
            <SwiperSelectItem index={1}>Option 1</SwiperSelectItem>
            <SwiperSelectItem index={2}>Option 2</SwiperSelectItem>
            <SwiperSelectItem index={3}>Option 3</SwiperSelectItem>
            <SwiperSelectItem index={4}>Option 4</SwiperSelectItem>
          </SwiperSelect>
        )
        : (
          <SwiperTabs>
            <SwiperTab index={1}>Option 1</SwiperTab>
            <SwiperTab index={2}>Option 2</SwiperTab>
            <SwiperTab index={3}>Option 3</SwiperTab>
            <SwiperTab index={4}>Option 4</SwiperTab>
          </SwiperTabs>
        )}

      <SwiperItems className="flex-grow">
        <SwiperItem index={1}>1</SwiperItem>
        <SwiperItem index={2}>2</SwiperItem>
        <SwiperItem index={3}>3</SwiperItem>
        <SwiperItem index={4}>4</SwiperItem>
      </SwiperItems>
    </Swiper>
  );
}
```

<br>
