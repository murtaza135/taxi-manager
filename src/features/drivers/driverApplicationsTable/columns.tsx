import { ColumnDef } from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import { IoEllipsisVertical } from 'react-icons/io5';
import { FiEye } from 'react-icons/fi';
import { FaTrashAlt } from 'react-icons/fa';
import { MdPersonAddAlt1 } from 'react-icons/md';
import { format } from 'date-fns';
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
import { DriverApplication } from '@/features/drivers/general/hooks/useDriverApplications';
import { extractInitials } from '@/utils/string/extractInitials';
import { cn } from '@/utils/cn';
import { LinkCell } from '@/ui/dataview/Cell';
import { useReactTableContext } from '@/lib/tanstack-table/ReactTable';
import { useDeleteDriverApplication } from '@/features/drivers/general/hooks/useDeleteDriverApplication';
import { useConvertDriverApplicationToDriver } from '@/features/drivers/general/hooks/useConvertDriverApplicationToDriver';
import { queryClient } from '@/config/api/queryClient';
import { driverApplicationQueryOptions } from '@/features/drivers/general/hooks/useDriverApplication';
import { NonNullableObject } from '@/types/utils';

// ColumnDef for the table layout
export const tableColumns: ColumnDef<DriverApplication>[] = [
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
            alt={`driver-application-${row.original.id}`}
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
      <LinkCell to={`/driver-application/${row.original.id}`}>
        {row.original.name}
      </LinkCell>
    ),
  },
  {
    id: 'Submitted',
    accessorKey: 'is_submitted',
    header: 'Submitted?',
    cell: ({ row }) => (
      <div className={cn('py-1 px-2 rounded-full text-nowrap w-fit', row.original.is_submitted ? 'bg-green-500 text-achromatic-lighter dark:bg-green-400 dark:text-achromatic-dark' : 'bg-red-500 text-achromatic-lighter dark:bg-red-500 dark:text-achromatic-dark')}>
        {row.original.is_submitted ? 'Yes' : 'No'}
      </div>
    ),
  },
  {
    id: 'Date Created',
    accessorKey: 'created_at',
    header: 'Date Created',
    cell: ({ row }) => format(row.original.created_at, 'dd/MM/yyyy'),
  },
  {
    id: 'Actions',
    header: 'Actions',
    cell: function ActionsCell({ row }) {
      const table = useReactTableContext();
      const { mutateAsync: deleteDriverApplication } = useDeleteDriverApplication();
      const { mutate: convert } = useConvertDriverApplicationToDriver();

      const handleDeleteDriverApplication = async () => {
        await deleteDriverApplication(row.original.id);
        table.setRowSelection((old) => ({ ...old, [row.original.id]: false }));
      };

      const handleConvertDriverApplicationToDriver = async () => {
        if (row.original.is_submitted) {
          const data = await queryClient.ensureQueryData(
            driverApplicationQueryOptions(row.original.id),
          );

          const nonNullableData = data as NonNullableObject<typeof data>;

          convert({
            ...nonNullableData,
            licence_number: nonNullableData.drivers_licence_number,
            licence_start_date: nonNullableData.drivers_licence_start_date,
            licence_end_date: nonNullableData.drivers_licence_end_date,
            badge_number: nonNullableData.taxi_badge_number,
            badge_end_date: nonNullableData.taxi_badge_end_date,
            licence_document_path: nonNullableData.drivers_licence_path,
            badge_document_path: nonNullableData.taxi_badge_path,
            badge_start_date: nonNullableData.taxi_badge_start_date,
          });
        }
      };

      return (
        <div className="flex items-center gap-6">
          <Link to={`/driver/${row.original.id}`} className="center">
            <Button variant="ghost" className="p-0">
              <FiEye className="text-xl" />
            </Button>
          </Link>
          <Button variant="ghost" className="p-0" onClick={handleConvertDriverApplicationToDriver} disabled={!row.original.is_submitted}>
            <MdPersonAddAlt1 className="text-2xl text-primary-dark dark:text-primary-light" />
          </Button>
          <Button variant="ghost" className="p-0" onClick={handleDeleteDriverApplication}>
            <FaTrashAlt className="text-xl text-red-800 dark:text-red-500/70 -translate-y-[1px]" />
          </Button>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
    enableGlobalFilter: false,
  },
];

// another ColumnDef for the grid layout
export const gridColumns: ColumnDef<DriverApplication>[] = [
  {
    id: 'Avatar',
    accessorKey: 'picture_src',
    header: 'Avatar',
    cell: ({ row }) => (
      <Avatar className={cn('h-32 w-32 border-[3px] border-achromatic-lighter dark:border-achromatic-dark')}>
        {row.original.picture_src && (
          <AvatarImage
            src={row.original.picture_src}
            alt={`driver-application-${row.original.id}`}
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
    id: 'Submitted',
    accessorKey: 'is_submitted',
    header: 'Submitted?',
    cell: ({ row }) => (row.original.is_submitted ? 'Yes' : 'No'),
  },
  {
    id: 'Date Created',
    accessorKey: 'created_at',
    header: 'Date Created',
    cell: ({ row }) => format(row.original.created_at, 'dd/MM/yyyy'),
  },
  {
    id: 'Options Top',
    cell: function ActionsCell({ row }) {
      const table = useReactTableContext();
      const { mutateAsync: deleteDriverApplication } = useDeleteDriverApplication();
      const { mutate: convert } = useConvertDriverApplicationToDriver();

      const handleDeleteDriverApplication = async () => {
        await deleteDriverApplication(row.original.id);
        table.setRowSelection((old) => ({ ...old, [row.original.id]: false }));
      };

      const handleConvertDriverApplicationToDriver = async () => {
        if (row.original.is_submitted) {
          const data = await queryClient.ensureQueryData(
            driverApplicationQueryOptions(row.original.id),
          );

          const nonNullableData = data as NonNullableObject<typeof data>;

          convert({
            ...nonNullableData,
            licence_number: nonNullableData.drivers_licence_number,
            licence_start_date: nonNullableData.drivers_licence_start_date,
            licence_end_date: nonNullableData.drivers_licence_end_date,
            badge_number: nonNullableData.taxi_badge_number,
            badge_end_date: nonNullableData.taxi_badge_end_date,
            licence_document_path: nonNullableData.drivers_licence_path,
            badge_document_path: nonNullableData.taxi_badge_path,
            badge_start_date: nonNullableData.taxi_badge_start_date,
          });
        }
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
            <DropdownMenuItem className={cn('hover:!opacity-100', !row.original.is_submitted && 'cursor-auto')}>
              <Button variant="ghost" className="p-0 gap-2" onClick={handleConvertDriverApplicationToDriver} disabled={!row.original.is_submitted}>
                <MdPersonAddAlt1 className="text-xl text-primary-dark dark:text-primary-light" />
                <p className="translate-y-[1px]">Add</p>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:!opacity-100">
              <Button variant="ghost" className="p-0 gap-3.5" onClick={handleDeleteDriverApplication}>
                <FaTrashAlt className="text-red-600 dark:text-red-500/70" />
                <p className="translate-y-[1px]">Delete</p>
              </Button>
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
      <Link to={`/driver-application/${row.original.id}`} className="w-full">
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
