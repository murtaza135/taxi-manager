import { Outlet } from 'react-router-dom';
import { Toaster } from '@/ui/toast';

export function RootLayout() {
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
}
