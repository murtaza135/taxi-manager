import { ColumnDef } from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import { IoEllipsisVertical } from 'react-icons/io5';
import { FiEye } from 'react-icons/fi';
import { FaTrashAlt } from 'react-icons/fa';
import { PiArrowUDownLeftBold } from 'react-icons/pi';
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
import { Button } from '@/ui/Button';
import { Hire } from '@/features/hires/general/hooks/useHires';
import { NoDataCell, LinkCell, CopyCell } from '@/ui/dataview/Cell';
import { useReactTableContext } from '@/lib/tanstack-table/ReactTable';
import { HiresRowFilterState } from '@/features/hires/general/types';
import { useUpdateHireAgreementDetails } from '@/features/hires/general/hooks/useUpdateHireAgreement';

// ColumnDef for the table layout
export const tableColumns: ColumnDef<Hire>[] = [
  {
    id: 'Select',
    header: () => <DataViewCheckbox.Header />,
    cell: ({ row }) => <DataViewCheckbox.Row row={row} />,
    enableSorting: false,
    enableHiding: false,
    enableGlobalFilter: false,
  },
  {
    id: 'Hire ID',
    accessorKey: 'id',
    header: 'Hire ID',
    cell: ({ row }) => (
      <LinkCell to={`/hire/${row.original.id}`}>
        {row.original.id}
      </LinkCell>
    ),
  },
  {
    id: 'Driver Name',
    accessorKey: 'driver_name',
    header: 'Driver Name',
    cell: ({ row }) => (
      <LinkCell to={`/driver/${row.original.driver_id}`}>
        {row.original.driver_name}
      </LinkCell>
    ),
  },
  {
    id: 'Number Plate',
    accessorKey: 'number_plate',
    header: 'Number Plate',
    cell: ({ row }) => (
      <LinkCell to={`/taxi/${row.original.taxi_id}`}>
        {row.original.taxi_number_plate}
      </LinkCell>
    ),
  },
  {
    id: 'PHC Number',
    accessorKey: 'taxi_licence_phc_number',
    header: 'PHC Number',
    cell: ({ row }) => {
      if (!row.original.taxi_licence_phc_number) return <NoDataCell />;
      return (
        <LinkCell to={`/taxi/${row.original.taxi_id}`}>
          {row.original.taxi_licence_phc_number}
        </LinkCell>
      );
    },
  },
  {
    id: 'Rent',
    accessorKey: 'rent_amount',
    header: 'Rent',
    cell: ({ row }) => (
      <CopyCell text={`${row.original.rent_amount}`}>
        £{row.original.rent_amount}
      </CopyCell>
    ),
  },
  {
    id: 'Start Date',
    accessorKey: 'start_date',
    header: 'Start Date',
    cell: ({ row }) => (
      <CopyCell
        text={format(new Date(row.original.start_date), 'dd/MM/yyyy')}
      />
    ),
  },
  {
    id: 'End Date',
    accessorKey: 'end_date',
    header: 'End Date',
    cell: ({ row }) => {
      if (!row.original.end_date) return <NoDataCell />;
      return (
        <CopyCell
          text={format(new Date(row.original.end_date), 'dd/MM/yyyy')}
        />
      );
    },
  },
  {
    id: 'Actions',
    header: 'Actions',
    cell: function ActionsCell({ row }) {
      const table = useReactTableContext();
      const rowFilter = table.options.meta?.rowFilter as HiresRowFilterState | undefined;
      const { mutateAsync: update } = useUpdateHireAgreementDetails();

      const handleSetHireRetirement = async (is_retired: boolean) => {
        await update({ id: row.original.id, is_retired });
        table.setRowSelection((old) => ({ ...old, [row.original.id]: false }));
      };

      return (
        <div className="flex items-center gap-6">
          <Link to={`/hire/${row.original.id}`} className="center">
            <Button variant="ghost" className="p-0">
              <FiEye className="text-xl" />
            </Button>
          </Link>
          {rowFilter === 'inProgress' && (
            <Button variant="ghost" className="p-0" onClick={() => handleSetHireRetirement(true)}>
              <FaTrashAlt className="text-xl text-red-800 dark:text-red-500/70 -translate-y-[1px]" />
            </Button>
          )}
          {rowFilter === 'terminated' && (
            <Button variant="ghost" className="p-0" onClick={() => handleSetHireRetirement(false)}>
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
export const gridColumns: ColumnDef<Hire>[] = [
  {
    id: 'Hire Agreement ID',
    accessorKey: 'id',
    header: 'Hire Agreement ID',
  },
  {
    id: 'Driver Name',
    accessorKey: 'driver_name',
    header: 'Driver Name',
    cell: ({ row }) => (
      <LinkCell to={`/driver/${row.original.driver_id}`}>
        {row.original.driver_name}
      </LinkCell>
    ),
  },
  {
    id: 'Number Plate',
    accessorKey: 'number_plate',
    header: 'Number Plate',
    cell: ({ row }) => (
      <LinkCell to={`/taxi/${row.original.taxi_id}`}>
        {row.original.taxi_number_plate}
      </LinkCell>
    ),
  },
  {
    id: 'PHC Number',
    accessorKey: 'taxi_licence_phc_number',
    header: 'PHC Number',
    cell: ({ row }) => {
      if (!row.original.taxi_licence_phc_number) return <NoDataCell />;
      return (
        <LinkCell to={`/taxi/${row.original.taxi_id}`}>
          {row.original.taxi_licence_phc_number}
        </LinkCell>
      );
    },
  },
  {
    id: 'Rent',
    accessorKey: 'rent_amount',
    header: 'Rent',
    cell: ({ row }) => <CopyCell text={`${row.original.rent_amount}`} />,
  },
  {
    id: 'Start Date',
    accessorKey: 'start_date',
    header: 'Start Date',
    cell: ({ row }) => (
      <CopyCell
        text={format(new Date(row.original.start_date), 'dd/MM/yyyy')}
      />
    ),
  },
  {
    id: 'End Date',
    accessorKey: 'end_date',
    header: 'End Date',
    cell: ({ row }) => {
      if (!row.original.end_date) return <NoDataCell />;
      return (
        <CopyCell
          text={format(new Date(row.original.end_date), 'dd/MM/yyyy')}
        />
      );
    },
  },
  {
    id: 'Options Top',
    cell: function ActionsCell({ row }) {
      const table = useReactTableContext();
      const rowFilter = table.options.meta?.rowFilter as HiresRowFilterState | undefined;
      const { mutateAsync: update } = useUpdateHireAgreementDetails();

      const handleSetHireRetirement = async (is_retired: boolean) => {
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
              {rowFilter === 'inProgress' && (
                <Button variant="ghost" className="p-0 gap-2" onClick={() => handleSetHireRetirement(true)}>
                  <FaTrashAlt className="text-red-600 dark:text-red-500/70" />
                  <p className="translate-y-[1px]">Retire</p>
                </Button>
              )}
              {rowFilter === 'terminated' && (
                <Button variant="ghost" className="p-0 gap-2" onClick={() => handleSetHireRetirement(false)}>
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
      <Link to={`/hire/${row.original.id}`} className="w-full">
        <Button className="w-full">Open</Button>
      </Link>
    ),
    enableSorting: false,
    enableHiding: false,
    enableGlobalFilter: false,
  },
];

export const mapper: DataViewCardMainDataMapper = {
  title: 'Hire Agreement ID',
  optionsTop: 'Options Top',
  optionsBottom: 'Options Bottom',
} as const;

export const columns = {
  table: tableColumns,
  grid: gridColumns,
} as const;
