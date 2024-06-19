import { QueryClient } from '@tanstack/react-query';
import { redirect, Outlet } from 'react-router-dom';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { getLocalSession } from '@/features/auth/hooks/useLocalSession';
import { isAppError } from '@/config/errors/AppError';
import { logout } from '@/features/auth/hooks/useLogout';
import { toast } from '@/ui/toast';
import { BasicContainer, ContentContainer } from '@/ui/Container';
import { Spinner } from '@/ui/Spinner';
import { TopNav } from '@/features/navigation/components/top-nav/TopNav';
import { SideNav } from '@/features/navigation/components/side-nav/SideNav';
import { MobileNav } from '@/features/navigation/components/mobile-nav/MobileNav';

const privateLayoutLoader = (queryClient: QueryClient) => async () => {
  const localSession = getLocalSession();
  if (!localSession) {
    await logout();
    queryClient.clear();
    toast({ title: 'Error', description: 'Please login again', variant: 'destructive' });
    return redirect('/login');
  }

  try {
    await queryClient.ensureQueryData(sessionOptions());
    return null;
  } catch (error: unknown) {
    if (isAppError(error) && error.type === 'auth') {
      await logout();
      queryClient.clear();
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
      return redirect('/login');
    }

    if (isAppError(error)) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
      return null;
    }

    await logout();
    queryClient.clear();
    throw error;
  }
};

function PrivateLayoutSuspenseBoundary() {
  return (
    <BasicContainer>
      <Spinner />
    </BasicContainer>
  );
}

function PrivateLayoutComponent() {
  return (
    <>
      <SideNav />
      <TopNav />
      <ContentContainer>
        <Outlet />
      </ContentContainer>
      <MobileNav />
    </>
  );
}

export const loader = privateLayoutLoader;
export const SuspenseBoundary = PrivateLayoutSuspenseBoundary;
export const Component = PrivateLayoutComponent;
