import { Suspense, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { SideNav } from '@/features/navigation/components/side-nav/SideNav';
import { TopNav } from '@/features/navigation/components/top-nav/TopNav';
import { MobileNav } from '@/features/navigation/components/mobile-nav/MobileNav';
import { ContentContainer } from '@/ui/Container';
import { Spinner } from '@/ui/Spinner';
import { useSession } from '@/features/auth/hooks/useSession';
import { useUser } from '@/features/auth/hooks/useUser';

export function PrivateLayout() {
  const queryClient = useQueryClient();
  const { isLoading, isError, isSuccess } = useSession();

  console.log(isLoading);
  console.log(isSuccess);
  console.log(isError);

  useEffect(() => {
    if (isError) queryClient.clear();
  }, [isError, queryClient]);

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

  // TODO only redirect if auth error, not other error
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
