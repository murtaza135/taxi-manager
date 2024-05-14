import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const HomePage = lazy(() => import('@/pages/HomePage'));
const DriversPage = lazy(() => import('@/pages/DriversPage'));
const HiresPage = lazy(() => import('@/pages/HiresPage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const RentPage = lazy(() => import('@/pages/RentPage'));
const SettingsPage = lazy(() => import('@/pages/SettingsPage'));
const TaxisPage = lazy(() => import('@/pages/TaxisPage'));

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
