import { createBrowserRouter } from 'react-router-dom';
import { publicPages, privatePages } from './pages';
import { RootLayout } from '@/layouts/RootLayout';
import { PublicLayout } from '@/layouts/PublicLayout';
import { PrivateLayout } from '@/layouts/PrivateLayout';
import { ErrorPage } from '@/pages/ErrorPage';
import { IndexPage } from '@/pages/IndexPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <IndexPage />,
        index: true,
      },
      {
        element: <PublicLayout />,
        children: publicPages,
      },
      {
        element: <PrivateLayout />,
        children: privatePages,
      },
    ],
  },
]);
