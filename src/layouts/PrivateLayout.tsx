import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { SideNav } from '@/features/navigation/components/side-nav/SideNav';
import { TopNav } from '@/features/navigation/components/top-nav/TopNav';
import { MobileNav } from '@/features/navigation/components/mobile-nav/MobileNav';
import { ContentContainer } from '@/ui/Container';
import { Spinner } from '@/ui/Spinner';

export function PrivateLayout() {
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
