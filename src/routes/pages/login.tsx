import { QueryClient } from '@tanstack/react-query';
import { Title } from '@/features/title/components/Title';
import { LoginForm } from '@/features/auth/components/LoginForm';

const loginPageLoader = (_queryClient: QueryClient) => () => null;

function LoginPageSuspenseBoundary() {
  return <div>LoginPageSuspenseBoundary</div>;
}

function LoginPageErrorBoundary() {
  return <div>LoginPageErrorBoundary</div>;
}

function LoginPageComponent() {
  return (
    <>
      <Title title="Login" />
      <div className="min-h-dvh center">
        <LoginForm />
      </div>
    </>
  );
}

export const loader = loginPageLoader;
export const SuspenseBoundary = LoginPageSuspenseBoundary;
export const ErrorBoundary = LoginPageErrorBoundary;
export const Component = LoginPageComponent;
