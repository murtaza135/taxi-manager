import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { router } from '@/config/router/router';
import { router as router2 } from '@/config/router/router2';
import { queryClient } from '@/config/api/queryClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { applyTheme } from '@/features/darkmode/utils/applyTheme';
import { config } from '@/config/config';
import '@/styles/main.css';
import { Spinner } from '@/ui/Spinner';

// eslint-disable-next-line no-void
void queryClient.prefetchQuery(sessionOptions());
applyTheme();

export function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router2} />
        {!config.PROD && (
          <ReactQueryDevtools initialIsOpen={false} position="bottom" buttonPosition="bottom-right" />
        )}
      </QueryClientProvider>
    </Suspense>
  );
}
