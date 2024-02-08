import { Title } from '@/features/title/components/Title';
import { DataTable } from '@/features/tempTable/DataTable';
import { Payment, columns } from '@/features/tempTable/columns';

const data: Payment[] = [
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '728ed530',
    amount: 120,
    status: 'success',
    email: 'm2@example.com',
  },
];

export function DashboardPage() {
  return (
    <>
      <Title title="Dashboard" />
      {/* <div>DashboardPage</div> */}
      <DataTable columns={columns} data={data} />
    </>
  );
}
