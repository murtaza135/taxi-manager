import { Outlet } from 'react-router-dom';
import { Toaster } from '@/ui/toast';
import { ScrollToTopButton } from '@/features/scroll/ScrollToTopButton';

export function RootLayout() {
  return (
    <>
      <Outlet />
      <Toaster />
      <ScrollToTopButton />
    </>
  );
}
