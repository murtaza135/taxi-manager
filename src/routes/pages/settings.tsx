import { QueryClient } from '@tanstack/react-query';
import { Title } from '@/features/title/components/Title';

const settingsPageLoader = (_queryClient: QueryClient) => () => null;

function SettingsPageSuspenseBoundary() {
  return <div>SettingsPageSuspenseBoundary</div>;
}

function SettingsPageErrorBoundary() {
  return <div>SettingsPageErrorBoundary</div>;
}

function SettingsPageComponent() {
  return (
    <div>
      <Title title="Settings" />
      <div>SettingsPageComponent</div>
    </div>
  );
}

export const loader = settingsPageLoader;
export const SuspenseBoundary = SettingsPageSuspenseBoundary;
export const ErrorBoundary = SettingsPageErrorBoundary;
export const Component = SettingsPageComponent;
