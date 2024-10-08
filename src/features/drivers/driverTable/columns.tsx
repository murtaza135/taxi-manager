import { ColumnDef } from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import { IoEllipsisVertical } from 'react-icons/io5';
import { FiEye } from 'react-icons/fi';
import { FaTrashAlt } from 'react-icons/fa';
import { PiArrowUDownLeftBold } from 'react-icons/pi';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/ui/DropdownMenu';
import { DataViewCheckbox, DataViewCardMainDataMapper } from '@/ui/dataview/DataView';
import { Avatar, AvatarImage, AvatarPersistentFallback } from '@/ui/Avatar';
import { Button } from '@/ui/Button';
import { Driver } from '@/features/drivers/general/hooks/useDrivers';
import { extractInitials } from '@/utils/string/extractInitials';
import { cn } from '@/utils/cn';
import { NoDataCell, LinkCell, PhoneNumberCell, EmailCell } from '@/ui/dataview/Cell';
import { useReactTableContext } from '@/lib/tanstack-table/ReactTable';
import { DriversRowFilterState } from '@/features/drivers/general/types';
import { useUpdateDriverDetails } from '@/features/drivers/general/hooks/useUpdateDriverDetails';

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
        <AvatarPersistentFallback>
          {extractInitials(row.original.name)}
        </AvatarPersistentFallback>
      </Avatar>
    ),
    enableSorting: false,
    enableGlobalFilter: false,
  },
  {
    id: 'Name',
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <LinkCell to={`/driver/${row.original.id}`}>
        {row.original.name}
      </LinkCell>
    ),
  },
  {
    id: 'Phone Number',
    accessorKey: 'phone_number',
    header: 'Phone',
    cell: ({ row }) => {
      if (!row.original.phone_number) return <NoDataCell />;
      return <PhoneNumberCell phone={row.original.phone_number} />;
    },
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
    header: () => <p className="text-nowrap">Hire Agreeemnt</p>,
    cell: ({ row }) => {
      if (!row.original.hire_agreement_id) return <NoDataCell />;

      return (
        <LinkCell to={`/hire/${row.original.hire_agreement_id}`}>
          Agreement
        </LinkCell>
      );
    },
  },
  {
    id: 'Actions',
    header: 'Actions',
    cell: function ActionsCell({ row }) {
      const table = useReactTableContext();
      const rowFilter = table.options.meta?.rowFilter as DriversRowFilterState | undefined;
      const { mutateAsync: update } = useUpdateDriverDetails();

      const handleSetDriverRetirement = async (is_retired: boolean) => {
        await update({ id: row.original.id, is_retired });
        table.setRowSelection((old) => ({ ...old, [row.original.id]: false }));
      };

      return (
        <div className="flex items-center gap-6">
          <Link to={`/driver/${row.original.id}`} className="center">
            <Button variant="ghost" className="p-0">
              <FiEye className="text-xl" />
            </Button>
          </Link>
          {rowFilter === 'notRetired' && (
            <Button variant="ghost" className="p-0" onClick={() => handleSetDriverRetirement(true)}>
              <FaTrashAlt className="text-xl text-red-800 dark:text-red-500/70 -translate-y-[1px]" />
            </Button>
          )}
          {rowFilter === 'retired' && (
            <Button variant="ghost" className="p-0" onClick={() => handleSetDriverRetirement(false)}>
              <PiArrowUDownLeftBold className="text-xl text-primary-dark dark:text-achromatic-lighter" />
            </Button>
          )}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
    enableGlobalFilter: false,
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
        <AvatarPersistentFallback className="text-3xl">
          {extractInitials(row.original.name)}
        </AvatarPersistentFallback>
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
    cell: ({ row }) => {
      if (!row.original.hire_agreement_id) return <NoDataCell />;

      return (
        <LinkCell to={`/hire/${row.original.hire_agreement_id}`}>
          {row.original.hire_agreement_id}
        </LinkCell>
      );
    },
  },
  {
    id: 'Options Top',
    cell: function ActionsCell({ row }) {
      const table = useReactTableContext();
      const rowFilter = table.options.meta?.rowFilter as DriversRowFilterState | undefined;
      const { mutateAsync: update } = useUpdateDriverDetails();

      const handleSetDriverRetirement = async (is_retired: boolean) => {
        await update({ id: row.original.id, is_retired });
        table.setRowSelection((old) => ({ ...old, [row.original.id]: false }));
      };

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
            <DropdownMenuItem className="hover:!opacity-100">
              {rowFilter === 'notRetired' && (
                <Button variant="ghost" className="p-0 gap-2" onClick={() => handleSetDriverRetirement(true)}>
                  <FaTrashAlt className="text-red-600 dark:text-red-500/70" />
                  <p className="translate-y-[1px]">Retire</p>
                </Button>
              )}
              {rowFilter === 'retired' && (
                <Button variant="ghost" className="p-0 gap-2" onClick={() => handleSetDriverRetirement(false)}>
                  <PiArrowUDownLeftBold className="text-primary-dark dark:text-achromatic-lighter" />
                  <p>Recover</p>
                </Button>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableSorting: false,
    enableHiding: false,
    enableGlobalFilter: false,
  },
  {
    id: 'Options Bottom',
    cell: ({ row }) => (
      <Link to={`/driver/${row.original.id}`} className="w-full">
        <Button className="w-full">Open</Button>
      </Link>
    ),
    enableSorting: false,
    enableHiding: false,
    enableGlobalFilter: false,
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
