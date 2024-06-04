import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Spinner } from '@/ui/Spinner';
import { BasicContainer } from '@/ui/Container';
import { SimpleTopNav } from '@/features/navigation/components/top-nav/SimpleTopNav';
import { useLocalSession } from '@/features/auth/hooks/useLocalSession';

export function PublicLayout() {
  const session = useLocalSession();

  // if there is a session, then we do not want to be in the public layout
  if (session) {
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
