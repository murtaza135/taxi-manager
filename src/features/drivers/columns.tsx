import { ColumnDef } from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import { IoEllipsisVertical } from 'react-icons/io5';
import urlJoin from 'url-join';
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
} from '@/ui/DataView';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/Avatar';
import { Button } from '@/ui/Button';
import { Driver } from '@/features/drivers/hooks/useInfiniteDrivers';
import { extractInitials } from '@/utils/string/extractInitials';
import { config } from '@/config/config';
import { cn } from '@/utils/cn';
import { NoDataCell, LinkCell, PhoneNumberCell, EmailCell } from '@/ui/Cell';

// ColumnDef for the table layout
export const tableColumns: ColumnDef<Driver>[] = [
  {
    id: 'Select',
    header: () => <DataViewCheckbox.Header />,
    cell: ({ row }) => <DataViewCheckbox.Row row={row} />,
    enableSorting: false,
    enableHiding: false,
    enableGlobalFilter: false,
  },
  {
    id: 'Avatar',
    accessorKey: 'avatar',
    header: '',
    cell: ({ row }) => (
      <Avatar>
        {row.original.picture_src && (
          <AvatarImage
            src={row.original.picture_src}
            alt={`driver-${row.original.id}`}
          />
        )}
        <AvatarFallback>
          {extractInitials(row.original.name)}
        </AvatarFallback>
      </Avatar>
    ),
    enableSorting: false,
    enableGlobalFilter: false,
  },
  {
    id: 'Name',
    accessorKey: 'name',
    header: ({ column }) => <DataViewHeader column={column} header="Name" />,
    cell: ({ row }) => (
      <LinkCell to={`/driver/${row.original.id}`}>
        {row.original.name}
      </LinkCell>
    ),
  },
  {
    id: 'Phone Number',
    accessorKey: 'phone_number',
    header: ({ column }) => <DataViewHeader column={column} header="Phone" />,
    cell: ({ row }) => {
      if (!row.original.phone_number) return <NoDataCell />;
      return <PhoneNumberCell phone={row.original.phone_number} />;
    },
    enableSorting: false,
    enableGlobalFilter: false,
  },
  {
    id: 'Email',
    accessorKey: 'email',
    header: ({ column }) => <DataViewHeader column={column} header="Email" />,
    cell: ({ row }) => {
      if (!row.original.email) return <NoDataCell />;
      return <EmailCell email={row.original.email} />;
    },
  },
  {
    id: 'Taxi',
    accessorKey: 'number_plate',
    header: ({ column }) => <DataViewHeader column={column} header="Taxi" />,
    cell: ({ row }) => {
      if (!row.original.taxi_id || !row.original.number_plate) {
        return <NoDataCell />;
      }

      return (
        <LinkCell to={`/taxi/${row.original.taxi_id}`}>
          {row.original.number_plate}
        </LinkCell>
      );
    },
  },
  {
    id: 'Hire Agreement',
    accessorKey: 'hire_agreement_id',
    header: ({ column }) => <DataViewHeader column={column} header="Hire Agreement" className="text-nowrap" />,
    cell: ({ row }) => {
      if (!row.original.hire_agreement_id) return <NoDataCell />;

      return (
        <LinkCell to={`/hire/${row.original.hire_agreement_id}`}>
          Agreement
        </LinkCell>
      );
    },
    enableSorting: false,
    enableGlobalFilter: false,
  },
  {
    id: 'Options',
    cell: ({ row }) => {
      const fullDriverUrl = urlJoin(
        config.env.VITE_CLIENT_URL,
        `/driver/${row.original.id}`,
      );

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
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(fullDriverUrl)}>
              Copy Link
            </DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// another ColumnDef for the grid layout
export const gridColumns: ColumnDef<Driver>[] = [
  {
    id: 'Avatar',
    accessorKey: 'picture_src',
    header: 'Avatar',
    cell: ({ row }) => (
      <Avatar className={cn('h-32 w-32 border-[3px] border-achromatic-lighter dark:border-achromatic-dark')}>
        {row.original.picture_src && (
          <AvatarImage
            src={row.original.picture_src}
            alt={`user-${row.original.id}`}
          />
        )}
        <AvatarFallback className="text-3xl">
          {extractInitials(row.original.name)}
        </AvatarFallback>
      </Avatar>
    ),
    enableSorting: false,
    enableGlobalFilter: false,
  },
  {
    id: 'Name',
    accessorKey: 'name',
    header: 'Name',
  },
  {
    id: 'Phone Number',
    accessorKey: 'phone_number',
    header: 'Phone Number',
    cell: ({ row }) => {
      if (!row.original.phone_number) return <NoDataCell />;
      return <PhoneNumberCell phone={row.original.phone_number} />;
    },
    enableSorting: false,
    enableGlobalFilter: false,
  },
  {
    id: 'Email',
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => {
      if (!row.original.email) return <NoDataCell />;
      return <EmailCell email={row.original.email} />;
    },
  },
  {
    id: 'Taxi',
    accessorKey: 'number_plate',
    header: 'Taxi',
    // cell: ({ row }) => row.original.number_plate || 'N/A',
    cell: ({ row }) => {
      if (!row.original.taxi_id || !row.original.number_plate) {
        return <NoDataCell />;
      }

      return (
        <LinkCell to={`/taxi/${row.original.taxi_id}`}>
          {row.original.number_plate}
        </LinkCell>
      );
    },
  },
  {
    id: 'Hire Agreement',
    accessorKey: 'hire_agreement_id',
    header: 'Hire Agreement',
    // cell: ({ row }) => row.original.hire_agreement_id || 'N/A',
    cell: ({ row }) => {
      if (!row.original.hire_agreement_id) return <NoDataCell />;

      return (
        <LinkCell to={`/hire/${row.original.hire_agreement_id}`}>
          {row.original.hire_agreement_id}
        </LinkCell>
      );
    },
    enableSorting: false,
    enableGlobalFilter: false,
  },
  {
    id: 'Options Top',
    cell: ({ row }) => {
      const fullDriverUrl = urlJoin(
        config.env.VITE_CLIENT_URL,
        `/driver/${row.original.id}`,
      );

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
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(fullDriverUrl)}>
              Copy Link
            </DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    id: 'Options Bottom',
    cell: ({ row }) => (
      <Link to={`/driver/${row.original.id}`} className="w-full">
        <Button className="w-full">Open</Button>
      </Link>
    ),
  },
];

export const mapper: DataViewCardMainDataMapper = {
  title: 'Name',
  avatar: 'Avatar',
  optionsTop: 'Options Top',
  optionsBottom: 'Options Bottom',
} as const;

export const columns = {
  table: tableColumns,
  grid: gridColumns,
} as const;
