import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { router } from '@/config/router/router';
import { queryClient } from '@/config/api/queryClient';
import { applyTheme } from '@/features/darkmode/utils/applyTheme';
import { config } from '@/config/config';
import '@/styles/main.css';

applyTheme();

export function App() {
  return (
    <Suspense>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        {!config.PROD && (
          <ReactQueryDevtools initialIsOpen={false} position="bottom" buttonPosition="bottom-right" />
        )}
      </QueryClientProvider>
    </Suspense>
  );
}