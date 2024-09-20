import { LoginForm } from '@/features/auth/login/LoginForm';
import { useDocumentTitle } from '@/features/title/hooks/useDocumentTitle';
import { Spinner } from '@/ui/Spinner';
import { ErrorUI } from '@/errors/components/ErrorUI';
import { QueryLoaderFunction } from '@/lib/react-router-dom/types';

const loginPageLoader: QueryLoaderFunction = () => () => null;

function LoginPageSuspenseBoundary() {
  useDocumentTitle('Login');
  return (
    <div className="min-h-[calc(100dvh-12rem)] center">
      <Spinner />
    </div>
  );
}

function LoginPageErrorBoundary() {
  useDocumentTitle('Login');
  return (
    <div className="min-h-[calc(100dvh-4rem)] center">
      <ErrorUI />
    </div>
  );
}

function LoginPageComponent() {
  useDocumentTitle('Login');

  return (
    <div className="min-h-[calc(100dvh-4rem)] center">
      <LoginForm />
    </div>
  );
}

export const loader = loginPageLoader;
export const SuspenseBoundary = LoginPageSuspenseBoundary;
export const ErrorBoundary = LoginPageErrorBoundary;
export const Component = LoginPageComponent;
