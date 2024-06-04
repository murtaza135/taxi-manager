import { Suspense, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { SideNav } from '@/features/navigation/components/side-nav/SideNav';
import { TopNav } from '@/features/navigation/components/top-nav/TopNav';
import { MobileNav } from '@/features/navigation/components/mobile-nav/MobileNav';
import { ContentContainer } from '@/ui/Container';
import { Spinner } from '@/ui/Spinner';
import { useSession } from '@/features/auth/hooks/useSession';
import { useLogout } from '@/features/auth/hooks/useLogout';

export function PrivateLayout() {
  const { isLoading, isError } = useSession();
  const { mutate: logout } = useLogout({ redirect: '/login', replace: true });

  useEffect(() => {
    if (isError) logout();
  }, [isError, logout]);

  if (isLoading) {
    return (
      <>
        <SideNav />
        <TopNav />
        <ContentContainer>
          <Spinner />
        </ContentContainer>
        <MobileNav />
      </>
    );
  }

  if (isError) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <SideNav />
      <TopNav />
      <ContentContainer>
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </ContentContainer>
      <MobileNav />
    </>
  );
}
