import { ColumnDef } from '@tanstack/react-table';
import { IoEllipsisVertical } from 'react-icons/io5';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/ui/DropdownMenu';
import { DataViewCheckbox, DataViewHeader, DataViewCardMainDataMapper, DataViewOpenPage } from '@/ui/DataView';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/Avatar';

export type Driver = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  taxi: string;
  avatar?: string;
  image?: string;
};

export const tableColumns: ColumnDef<Driver>[] = [
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
    accessorKey: 'name',
    header: ({ column }) => <DataViewHeader column={column} header="Name" />,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <DataViewHeader column={column} header="Email" />,
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone Number',
    enableGlobalFilter: false,
  },
  {
    accessorKey: 'taxi',
    header: ({ column }) => <DataViewHeader column={column} header="Taxi" />,
  },
  {
    id: 'options',
    cell: ({ row }) => {
      const driver = row.original;

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
              onClick={() => navigator.clipboard.writeText(driver.id)}
            >
              Copy Driver ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const gridColumns: ColumnDef<Driver>[] = [
  {
    accessorKey: 'avatar',
    header: 'Avatar',
    // cell: ({ row }) => (
    //   <Avatar className="hover:opacity-65 transition-opacity">
    //     <AvatarImage src={row.getValue('avatar')} alt="user" />
    //     <AvatarFallback className="dark:text-achromatic-light">Cn</AvatarFallback>
    //   </Avatar>
    // ),
  },
  {
    accessorKey: 'image',
    header: 'Image',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone Number',
    enableGlobalFilter: false,
  },
  {
    accessorKey: 'taxi',
    header: 'Taxi',
  },
  {
    id: 'options',
    cell: ({ row }) => {
      const driver = row.original;

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
              onClick={() => navigator.clipboard.writeText(driver.id)}
            >
              Copy Driver ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const mapper: DataViewCardMainDataMapper = {
  title: 'name',
  subtitle: 'taxi',
  avatar: 'avatar',
  options: 'options',
  image: 'image',
} as const;

export const columns = {
  table: tableColumns,
  grid: gridColumns,
} as const;
