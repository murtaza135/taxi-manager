import { Title } from '@/features/title/components/Title';
import { LoginForm } from '@/features/auth/components/LoginForm';

export function LoginPage() {
  return (
    <>
      <Title title="Login" />
      <div className="min-h-dvh center">
        <LoginForm />
      </div>
    </>
  );
}
