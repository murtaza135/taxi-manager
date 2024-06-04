import { Suspense, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { SideNav } from '@/features/navigation/components/side-nav/SideNav';
import { TopNav } from '@/features/navigation/components/top-nav/TopNav';
import { MobileNav } from '@/features/navigation/components/mobile-nav/MobileNav';
import { ContentContainer } from '@/ui/Container';
import { Spinner } from '@/ui/Spinner';
import { useSession } from '@/features/auth/hooks/useSession';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { useToast } from '@/ui/toast';

export function PrivateLayout() {
  const { isLoading, isError, error } = useSession();
  const { mutate: logout } = useLogout({ redirect: '/login', replace: true });
  const { toast } = useToast();

  useEffect(() => {
    if (isError) {
      logout();
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  }, [isError, error, logout, toast]);

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
