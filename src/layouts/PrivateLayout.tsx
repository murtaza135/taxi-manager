import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { NavBackdrop } from '@/features/navigation/components/side-nav/NavBackdrop';
import { SideNav } from '@/features/navigation/components/side-nav/SideNav';
import { TopNav } from '@/features/navigation/components/top-nav/TopNav';
import { ContentContainer } from '@/ui/Container';

export function PrivateLayout() {
  return (
    <>
      <SideNav />
      <TopNav />
      <ContentContainer>
        <Suspense fallback={<p>PrivateLayout Loading...</p>}>
          <Outlet />
        </Suspense>
      </ContentContainer>
      <NavBackdrop />
    </>
  );
}
