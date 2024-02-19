import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
const DriversPage = lazy(() => import('@/pages/DriversPage'));
const HiresPage = lazy(() => import('@/pages/HiresPage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const RentPage = lazy(() => import('@/pages/RentPage'));
const SettingsPage = lazy(() => import('@/pages/SettingsPage'));
const TaxisPage = lazy(() => import('@/pages/TaxisPage'));

const publicPages: RouteObject[] = [
  {
    path: '/login',
    element: <LoginPage />,
  },
];

const privatePages: RouteObject[] = [
  {
    path: '/',
    element: <DashboardPage />,
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

export const pages = {
  public: publicPages,
  private: privatePages,
};
