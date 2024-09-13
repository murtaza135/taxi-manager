import { QueryClient } from '@tanstack/react-query';
import { useDocumentTitle } from '@/features/title/hooks/useDocumentTitle';
import { SettingsAccordion } from '@/features/settings/components/SettingsAccordion';

const settingsPageLoader = (_queryClient: QueryClient) => () => null;

function SettingsPageSuspenseBoundary() {
  useDocumentTitle('Rent');
  return <div>SettingsPageSuspenseBoundary</div>;
}

function SettingsPageErrorBoundary() {
  useDocumentTitle('Rent');
  return <div>SettingsPageErrorBoundary</div>;
}

function SettingsPageComponent() {
  useDocumentTitle('Settings');

  return (
    <SettingsAccordion />
  );
}

export const loader = settingsPageLoader;
export const SuspenseBoundary = SettingsPageSuspenseBoundary;
export const ErrorBoundary = SettingsPageErrorBoundary;
export const Component = SettingsPageComponent;
