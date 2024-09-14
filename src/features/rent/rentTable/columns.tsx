import { ColumnDef } from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import { IoEllipsisVertical } from 'react-icons/io5';
import { FiEye } from 'react-icons/fi';
import { TbCurrencyPound, TbCurrencyPoundOff } from 'react-icons/tb';
import { FaTrashAlt } from 'react-icons/fa';
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
import { NoDataCell, LinkCell, CopyCell } from '@/ui/dataview/Cell';
import { useReactTableContext } from '@/lib/tanstack-table/ReactTable';
import { Rent } from '@/features/rent/general/hooks/useRents';
import { usePayRent } from '@/features/rent/general/hooks/usePayRent';
import { useUnpayRent } from '@/features/rent/general/hooks/useUnpayRent';
import { useDeleteRent } from '@/features/rent/general/hooks/useDeleteRent';

// ColumnDef for the table layout
export const tableColumns: ColumnDef<Rent>[] = [
  {
    id: 'Select',
    header: () => <DataViewCheckbox.Header />,
    cell: ({ row }) => <DataViewCheckbox.Row row={row} />,
    enableSorting: false,
    enableHiding: false,
    enableGlobalFilter: false,
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
    id: 'Hire ID',
    accessorKey: 'hire_id',
    header: 'Hire ID',
    cell: ({ row }) => (
      <LinkCell to={`/hire/${row.original.hire_id}`}>
        {row.original.id}
      </LinkCell>
    ),
  },
  {
    id: 'Taxi',
    accessorKey: 'number_plate',
    header: 'Taxi',
    cell: ({ row }) => (
      <LinkCell to={`/taxi/${row.original.taxi_id}`} className="uppercase">
        {row.original.number_plate}{row.original.phc_number ? `(${row.original.phc_number})` : ''}
      </LinkCell>
    ),
  },
  {
    id: 'Driver',
    accessorKey: 'driver_name',
    header: 'Driver',
    cell: ({ row }) => (
      <LinkCell to={`/driver/${row.original.driver_id}`} className="capitalize">
        {row.original.driver_name}
      </LinkCell>
    ),
  },
  {
    id: 'Amount',
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => (
      <CopyCell text={`${row.original.amount}`}>
        £{row.original.amount}
      </CopyCell>
    ),
  },
  {
    id: 'Paid?',
    accessorKey: 'is_paid',
    header: 'Paid?',
    cell: ({ row }) => (
      <div>
        {row.original.is_paid}
      </div>
    ),
  },
  {
    id: 'Paid Date',
    accessorKey: 'paid_date',
    header: 'Paid Date',
    cell: ({ row }) => {
      if (!row.original.end_date) return <NoDataCell />;
      return (
        <CopyCell
          text={format(new Date(row.original.paid_date ?? ''), 'dd/MM/yyyy')}
        />
      );
    },
  },
  {
    id: 'Actions',
    header: 'Actions',
    cell: function ActionsCell({ row }) {
      const table = useReactTableContext();
      const { mutateAsync: payRent } = usePayRent();
      const { mutateAsync: unpayRent } = useUnpayRent();
      const { mutateAsync: deleteRent } = useDeleteRent();

      const handlePayRent = async () => {
        await payRent(row.original.id);
        table.setRowSelection((old) => ({ ...old, [row.original.id]: false }));
      };
      const handleUnpayRent = async () => {
        await unpayRent(row.original.id);
        table.setRowSelection((old) => ({ ...old, [row.original.id]: false }));
      };
      const handleDeleteRent = async () => {
        await deleteRent(row.original.id);
        table.setRowSelection((old) => ({ ...old, [row.original.id]: false }));
      };

      return (
        <div className="flex items-center gap-6">
          <Link to={`/rent/${row.original.id}`} className="center">
            <Button variant="ghost" className="p-0">
              <FiEye className="text-xl" />
            </Button>
          </Link>
          {!row.original.is_paid && (
            <Button variant="ghost" className="p-0" onClick={handlePayRent}>
              <TbCurrencyPound className="text-xl text-primary-dark dark:text-achromatic-lighter -translate-y-[1px]" />
            </Button>
          )}
          {row.original.is_paid && (
            <Button variant="ghost" className="p-0" onClick={handleUnpayRent}>
              <TbCurrencyPoundOff className="text-xl text-red-800 dark:text-red-500/70 -translate-y-[1px]" />
            </Button>
          )}
          <Button variant="ghost" className="p-0" onClick={handleDeleteRent}>
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
export const gridColumns: ColumnDef<Rent>[] = [
  {
    id: 'Rent ID',
    accessorKey: 'id',
    header: 'Rent ID',
  },
  {
    id: 'Hire ID',
    accessorKey: 'hire_id',
    header: 'Hire ID',
    cell: ({ row }) => (
      <LinkCell to={`/hire/${row.original.hire_id}`}>
        {row.original.id}
      </LinkCell>
    ),
  },
  {
    id: 'Taxi',
    accessorKey: 'number_plate',
    header: 'Taxi',
    cell: ({ row }) => (
      <LinkCell to={`/taxi/${row.original.taxi_id}`} className="uppercase">
        {row.original.number_plate}{row.original.phc_number ? `(${row.original.phc_number})` : ''}
      </LinkCell>
    ),
  },
  {
    id: 'Driver',
    accessorKey: 'driver_name',
    header: 'Driver',
    cell: ({ row }) => (
      <LinkCell to={`/driver/${row.original.driver_id}`} className="capitalize">
        {row.original.driver_name}
      </LinkCell>
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
    id: 'Amount',
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => (
      <CopyCell text={`${row.original.amount}`}>
        £{row.original.amount}
      </CopyCell>
    ),
  },
  {
    id: 'Paid?',
    accessorKey: 'is_paid',
    header: 'Paid?',
    cell: ({ row }) => (
      <div>
        {row.original.is_paid}
      </div>
    ),
  },
  {
    id: 'Paid Date',
    accessorKey: 'paid_date',
    header: 'Paid Date',
    cell: ({ row }) => {
      if (!row.original.end_date) return <NoDataCell />;
      return (
        <CopyCell
          text={format(new Date(row.original.paid_date ?? ''), 'dd/MM/yyyy')}
        />
      );
    },
  },
  {
    id: 'Options Top',
    cell: function ActionsCell({ row }) {
      const table = useReactTableContext();
      const { mutateAsync: payRent } = usePayRent();
      const { mutateAsync: unpayRent } = useUnpayRent();
      const { mutateAsync: deleteRent } = useDeleteRent();

      const handlePayRent = async () => {
        await payRent(row.original.id);
        table.setRowSelection((old) => ({ ...old, [row.original.id]: false }));
      };
      const handleUnpayRent = async () => {
        await unpayRent(row.original.id);
        table.setRowSelection((old) => ({ ...old, [row.original.id]: false }));
      };
      const handleDeleteRent = async () => {
        await deleteRent(row.original.id);
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
              {!row.original.is_paid && (
                <Button variant="ghost" className="p-0 gap-2" onClick={handlePayRent}>
                  <TbCurrencyPound className="text-xl text-primary-dark dark:text-achromatic-lighter -translate-y-[1px]" />
                  <p>Pay</p>
                </Button>
              )}
              {row.original.is_paid && (
                <Button variant="ghost" className="p-0 gap-2" onClick={handleUnpayRent}>
                  <TbCurrencyPoundOff className="text-xl text-red-800 dark:text-red-500/70 -translate-y-[1px]" />
                  <p>Unpay</p>
                </Button>
              )}
              <Button variant="ghost" className="p-0 gap-2" onClick={handleDeleteRent}>
                <FaTrashAlt className="text-xl text-red-800 dark:text-red-500/70 -translate-y-[1px]" />
                <p>Delete</p>
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
      <Link to={`/rent/${row.original.id}`} className="w-full">
        <Button className="w-full">Open</Button>
      </Link>
    ),
    enableSorting: false,
    enableHiding: false,
    enableGlobalFilter: false,
  },
];

export const mapper: DataViewCardMainDataMapper = {
  title: 'Rent ID',
  optionsTop: 'Options Top',
  optionsBottom: 'Options Bottom',
} as const;

export const columns = {
  table: tableColumns,
  grid: gridColumns,
} as const;
