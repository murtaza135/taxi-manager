import { useDocumentTitle } from '@/features/title/hooks/useDocumentTitle';
import { SettingsAccordion } from '@/features/settings/components/SettingsAccordion';
import { QueryLoaderFunction } from '@/lib/react-router-dom/types';
import { companyOptions } from '@/features/auth/hooks/useCompany';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { Spinner } from '@/ui/Spinner';
import { ErrorUI } from '@/errors/components/ErrorUI';

const settingsPageLoader: QueryLoaderFunction = (queryClient) => () => {
  void queryClient.ensureQueryData(companyOptions());
  void queryClient.ensureQueryData(sessionOptions());
  return null;
};

function SettingsPageSuspenseBoundary() {
  useDocumentTitle('Settings');
  return <Spinner />;
}

function SettingsPageErrorBoundary() {
  useDocumentTitle('Settings');
  return <ErrorUI />;
}

function SettingsPageComponent() {
  useDocumentTitle('Settings');
  return <SettingsAccordion />;
}

export const loader = settingsPageLoader;
export const SuspenseBoundary = SettingsPageSuspenseBoundary;
export const ErrorBoundary = SettingsPageErrorBoundary;
export const Component = SettingsPageComponent;
