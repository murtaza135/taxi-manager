import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Spinner } from '@/ui/Spinner';
import { BasicContainer } from '@/ui/Container';
import { SimpleTopNav } from '@/features/navigation/components/top-nav/SimpleTopNav';
import { useSession } from '@/features/auth/hooks/useSession';
import { useUser } from '@/features/auth/hooks/useUser';

export function PublicLayout() {
  const { isLoading, isSuccess } = useSession();

  if (isLoading) {
    return (
      <>
        <SimpleTopNav />
        <BasicContainer>
          <Spinner />
        </BasicContainer>
      </>
    );
  }

  // if there is a session, then we do not want to be in the public layout
  if (isSuccess) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <SimpleTopNav />
      <BasicContainer>
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </BasicContainer>
    </>
  );
}
