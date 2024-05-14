import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { router } from '@/config/router/router';
import { queryClient } from '@/config/api/queryClient';
import { applyTheme } from '@/features/darkmode/utils/applyTheme';
import '@/styles/main.css';

applyTheme();

export function App() {
  return (
    <Suspense>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        {/* <ReactQueryDevtools initialIsOpen={false} panelPosition="bottom" position="bottom-right" /> */}
      </QueryClientProvider>
    </Suspense>
  );
}
