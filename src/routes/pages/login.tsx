import { QueryClient } from '@tanstack/react-query';
import { LoginForm } from '@/features/auth/login/LoginForm';
import { useDocumentTitle } from '@/features/title/hooks/useDocumentTitle';

const loginPageLoader = (_queryClient: QueryClient) => () => null;

function LoginPageSuspenseBoundary() {
  useDocumentTitle('Login');
  return <div>LoginPageSuspenseBoundary</div>;
}

function LoginPageErrorBoundary() {
  useDocumentTitle('Login');
  return <div>LoginPageErrorBoundary</div>;
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
