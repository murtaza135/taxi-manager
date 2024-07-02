import { QueryClient } from '@tanstack/react-query';
import { redirect, Outlet } from 'react-router-dom';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { getLocalSession } from '@/features/auth/hooks/useLocalSession';
import { AppError } from '@/errors/AppError';
import { logout } from '@/features/auth/hooks/useLogout';
import { toast } from '@/ui/toast';
import { BasicContainer, ContentContainer } from '@/ui/Container';
import { Spinner } from '@/ui/Spinner';
import { TopNav } from '@/features/navigation/components/top-nav/TopNav';
import { SideNav } from '@/features/navigation/components/side-nav/SideNav';
import { MobileNav } from '@/features/navigation/components/mobile-nav/MobileNav';

const privateLayoutLoader = (queryClient: QueryClient) => async () => {
  console.log('running private loader');
  const localSession = getLocalSession();
  if (!localSession) {
    await logout();
    queryClient.clear();
    toast({ title: 'Error', description: 'Please login again', variant: 'destructive' });
    return redirect('/login');
  }

  try {
    await queryClient.ensureQueryData(sessionOptions());
    console.log('here1');
    return null;
  } catch (error: unknown) {
    if (error instanceof AppError && error.status === 401) {
      await logout();
      queryClient.clear();
      toast({ title: error.title, description: error.description, variant: 'destructive' });
      console.log('here2');
      return redirect('/login');
    }

    if (error instanceof AppError) {
      toast({ title: error.title, description: error.description, variant: 'destructive' });
      return null;
    }

    console.log('here 3');

    await logout();
    queryClient.clear();
    throw error;
  }
};

function PrivateLayoutSuspenseBoundary() {
  return (
    <BasicContainer center>
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
