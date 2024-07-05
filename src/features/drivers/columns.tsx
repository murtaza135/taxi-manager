import { ColumnDef } from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import { IoEllipsisVertical } from 'react-icons/io5';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { BiCopyAlt } from 'react-icons/bi';
import { TiEye } from 'react-icons/ti';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/ui/DropdownMenu';
import {
  DataViewCheckbox,
  DataViewHeader,
  DataViewCardMainDataMapper,
  DataViewOpenPageButton,
  DataViewNoDataCell,
  DataViewLinkCell,
  DataViewPhoneNumberCell,
  DataViewEmailCell,
  DataViewCopyCell,
} from '@/ui/DataView';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/Avatar';
import { Button } from '@/ui/Button';
import { DriverDetails } from '@/features/drivers/hooks/useDrivers';
import { capitalizeEachWord } from '@/utils/string/capitalizeEachWord';
import { extractInitials } from '@/utils/string/extractInitials';
import { TooltipWrapper } from '@/ui/Tooltip';
import personDark from '@/assets/images/person-dark.png';
import personLight from '@/assets/images/person-light.png';
import { config } from '@/config/config';

// ColumnDef for the table layout
export const tableColumns: ColumnDef<DriverDetails>[] = [
  {
    id: 'select',
    header: ({ table }) => <DataViewCheckbox.Header table={table} />,
    cell: ({ row }) => <DataViewCheckbox.Cell dataRow={row} />,
    enableSorting: false,
    enableHiding: false,
    enableGlobalFilter: false,
  },
  {
    accessorKey: 'avatar',
    header: '',
    cell: ({ row }) => (
      <Avatar>
        {row.original.picture_src && (
          <AvatarImage
            src={row.original.picture_src}
            alt={`user-${row.original.id}`}
          />
        )}
        <AvatarFallback>
          {extractInitials(row.original.name)}
        </AvatarFallback>
      </Avatar>
    ),
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataViewHeader column={column} header="Name" />,
    cell: ({ row }) => (
      <DataViewLinkCell to={`/driver/${row.original.id}`}>
        {row.original.name}
      </DataViewLinkCell>
    ),
  },
  {
    accessorKey: 'phone_number',
    header: ({ column }) => <DataViewHeader column={column} header="Phone" />,
    cell: ({ row }) => {
      if (!row.original.phone_number) return <DataViewNoDataCell />;
      return <DataViewPhoneNumberCell phone={row.original.phone_number} />;
    },
    enableSorting: false,
    enableGlobalFilter: false,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <DataViewHeader column={column} header="Email" />,
    cell: ({ row }) => {
      if (!row.original.email) return <DataViewNoDataCell />;
      return <DataViewEmailCell email={row.original.email} />;
    },
  },
  {
    accessorKey: 'active_taxi_number_plate',
    header: ({ column }) => <DataViewHeader column={column} header="Taxi" />,
    cell: ({ row }) => {
      if (!row.original.active_taxi_id || !row.original.active_taxi_number_plate) {
        return <DataViewNoDataCell />;
      }

      return (
        <DataViewLinkCell to={`/taxi/${row.original.active_taxi_id}`}>
          {row.original.active_taxi_number_plate}
        </DataViewLinkCell>
      );
    },
  },
  {
    accessorKey: 'active_hire_agreement_id',
    header: ({ column }) => <DataViewHeader column={column} header="Hire Agreement" className="text-nowrap" />,
    cell: ({ row }) => {
      if (!row.original.active_hire_agreement_id) return <DataViewNoDataCell />;

      return (
        <DataViewLinkCell to={`/hire/${row.original.active_hire_agreement_id}`}>
          Agreement
        </DataViewLinkCell>
      );
    },
    enableSorting: false,
    enableGlobalFilter: false,
  },
  {
    id: 'options',
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="cursor-pointer hover:opacity-70 transition-opacity">
            <span className="sr-only">Options</span>
            <IoEllipsisVertical />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            // TODO join url properly
            onClick={
              () => navigator.clipboard.writeText(
                `${config.env.VITE_CLIENT_URL}driver/${row.original.id}`,
              )
            }
          >
            Copy Link
          </DropdownMenuItem>
          <DropdownMenuItem>
            Delete Driver
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

// another ColumnDef for the grid layout
export const gridColumns: ColumnDef<DriverDetails>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'picture_src',
    header: 'Avatar',
  },
  {
    accessorKey: 'phone_number',
    header: 'Phone Number',
    cell: ({ row }) => row.original.phone_number || 'N/A',
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => row.original.email || 'N/A',
  },
  {
    accessorKey: 'active_taxi_number_plate',
    header: 'Taxi',
    cell: ({ row }) => row.original.active_taxi_number_plate || 'N/A',
  },
  {
    accessorKey: 'active_hire_agreement_id',
    header: 'Agreement No.',
    cell: ({ row }) => row.original.active_hire_agreement_id || 'N/A',
  },
  {
    id: 'optionsTop',
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="translate-x-2">
          <div className="cursor-pointer hover:opacity-70 transition-opacity">
            <span className="sr-only">Options</span>
            <IoEllipsisVertical />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            // TODO join url properly
            onClick={
              () => navigator.clipboard.writeText(
                `${config.env.VITE_CLIENT_URL}driver/${row.original.id}`,
              )
            }
          >
            Copy Link
          </DropdownMenuItem>
          <DropdownMenuItem>
            Delete Driver
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
  {
    id: 'optionsBottom',
    cell: ({ row }) => (
      <Link to={`/driver/${row.original.id}`} className="w-full">
        <Button className="w-full">Open</Button>
      </Link>
    ),
  },
];

export const mapper: DataViewCardMainDataMapper = {
  title: 'name',
  avatar: 'picture_src',
  optionsTop: 'optionsTop',
  optionsBottom: 'optionsBottom',
  // subtitle: 'subtitle', // if you have a subtitle property in ColumnDef
  // image: 'picture_src', // if you have an image property in ColumnDef
} as const;

export const columns = {
  table: tableColumns,
  grid: gridColumns,
} as const;
