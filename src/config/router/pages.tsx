import { RouteObject } from 'react-router-dom';
import { lazyImport } from '@/utils/lazy-import';

const { HomePage } = lazyImport(() => import('@/pages/HomePage'), 'HomePage');
const { DriversPage } = lazyImport(() => import('@/pages/DriversPage'), 'DriversPage');
const { HiresPage } = lazyImport(() => import('@/pages/HiresPage'), 'HiresPage');
const { LoginPage } = lazyImport(() => import('@/pages/LoginPage'), 'LoginPage');
const { RentPage } = lazyImport(() => import('@/pages/RentPage'), 'RentPage');
const { SettingsPage } = lazyImport(() => import('@/pages/SettingsPage'), 'SettingsPage');
const { TaxisPage } = lazyImport(() => import('@/pages/TaxisPage'), 'TaxisPage');

export const publicPages: RouteObject[] = [
  {
    path: '/login',
    element: <LoginPage />,
  },
];

export const privatePages: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/rent',
    element: <RentPage />,
  },
  {
    path: '/hires',
    element: <HiresPage />,
  },
  {
    path: '/taxis',
    element: <TaxisPage />,
  },
  {
    path: '/drivers',
    element: <DriversPage />,
  },
  {
    path: '/settings',
    element: <SettingsPage />,
  },
];
