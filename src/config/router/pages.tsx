import { RouteObject } from 'react-router-dom';
import { lazyImport } from '@/utils/lazy-import';

const { IndexPage } = lazyImport(() => import('@/pages/IndexPage'), 'IndexPage');
const { HomePage } = lazyImport(() => import('@/pages/HomePage'), 'HomePage');
const { DriverPage } = lazyImport(() => import('@/pages/DriverPage'), 'DriverPage');
const { DriversPage } = lazyImport(() => import('@/pages/DriversPage'), 'DriversPage');
const { HirePage } = lazyImport(() => import('@/pages/HirePage'), 'HirePage');
const { HiresPage } = lazyImport(() => import('@/pages/HiresPage'), 'HiresPage');
const { LoginPage } = lazyImport(() => import('@/pages/LoginPage'), 'LoginPage');
const { RentPage } = lazyImport(() => import('@/pages/RentPage'), 'RentPage');
const { SettingsPage } = lazyImport(() => import('@/pages/SettingsPage'), 'SettingsPage');
const { TaxiPage } = lazyImport(() => import('@/pages/TaxiPage'), 'TaxiPage');
const { TaxisPage } = lazyImport(() => import('@/pages/TaxisPage'), 'TaxisPage');

export const publicPages: RouteObject[] = [
  {
    path: '/',
    element: <IndexPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
];

export const privatePages: RouteObject[] = [
  {
    path: '/home',
    element: <HomePage />,
  },
  {
    path: '/rent',
    element: <RentPage />,
  },
  {
    path: '/hire/:id',
    element: <HirePage />,
  },
  {
    path: '/hires',
    element: <HiresPage />,
  },
  {
    path: '/taxi/:id',
    element: <TaxiPage />,
  },
  {
    path: '/taxis',
    element: <TaxisPage />,
  },
  {
    path: '/driver/:id',
    element: <DriverPage />,
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
