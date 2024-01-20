import { useNavTitleValue } from '@/features/navigation/hooks/useNavTitleValue';

export function SettingsPage() {
  useNavTitleValue('Settings');

  return (
    <div>SettingsPage</div>
  );
}
