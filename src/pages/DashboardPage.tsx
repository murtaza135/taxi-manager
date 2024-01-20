import { useNavTitleValue } from '@/features/navigation/hooks/useNavTitleValue';

export function DashboardPage() {
  useNavTitleValue('Dashboard');

  return (
    <div>DashboardPage</div>
  );
}
