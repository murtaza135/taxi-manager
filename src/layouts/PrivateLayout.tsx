import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { SideNav } from '@/features/navigation/components/side-nav/SideNav';
import { NavBackdrop } from '@/features/navigation/components/side-nav/NavBackdrop';
import { TopNav } from '@/features/navigation/components/top-nav/TopNav';

export function PrivateLayout() {
  return (
    <>
      <SideNav />
      <TopNav />
      <div className="container-fluid min-h-dvh mx-auto pl-5 sm:pl-[9.625rem] md:pl-[18.5rem] pr-5 pt-20 pb-5 flex flex-col [&>*]:flex-grow">
        <Suspense fallback={<p>PrivateLayout Loading...</p>}>
          <Outlet />
        </Suspense>
      </div>
      <NavBackdrop />
    </>
  );
}
