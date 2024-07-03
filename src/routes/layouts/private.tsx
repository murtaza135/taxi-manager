import { QueryClient } from '@tanstack/react-query';
import { redirect, Outlet } from 'react-router-dom';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { companyOptions } from '@/features/auth/hooks/useCompany';
import { companyLogoOptions } from '@/features/auth/hooks/useCompanyLogo';
import { getLocalSession } from '@/features/auth/hooks/useLocalSession';
import { AppError } from '@/errors/AppError';
import { logout } from '@/features/auth/hooks/useLogout';
import { toast } from '@/ui/toast';
import { ContentContainer } from '@/ui/Container';
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
  } catch (error: unknown) {
    if (error instanceof AppError && error.type === 'authentication') {
      await logout();
      queryClient.clear();
      toast({ title: error.title, description: error.description, variant: 'destructive' });
      return redirect('/login');
    }

    if (error instanceof AppError) {
      toast({ title: error.title, description: error.description, variant: 'destructive' });
      return null;
    }

    await logout();
    queryClient.clear();
    throw error;
  }

  try {
    await Promise.all([
      queryClient.ensureQueryData(companyOptions()),
      queryClient.ensureQueryData(companyLogoOptions()),
    ]);
  } catch {
    throw new Error('Oops! Something went wrong.');
  }

  return null;
};

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
export const Component = PrivateLayoutComponent;
