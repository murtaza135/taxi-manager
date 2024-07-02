import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BasicContainer } from '@/ui/Container';
import { Spinner } from '@/ui/Spinner';
import { router } from '@/config/router';
import { queryClient } from '@/config/api/queryClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { applyTheme } from '@/features/darkmode/utils/applyTheme';
import { useTopBarProgressConfiguration } from '@/ui/TopBarProgress';
import { config } from '@/config/config';
import '@/styles/main.css';

void queryClient.prefetchQuery(sessionOptions());
applyTheme();

export function App() {
  useTopBarProgressConfiguration();

  return (
    <Suspense>
      <QueryClientProvider client={queryClient}>
        <RouterProvider
          router={router}
          fallbackElement={(
            <BasicContainer center>
              <Spinner />
            </BasicContainer>
          )}
        />
        {!config.PROD && (
          <ReactQueryDevtools initialIsOpen={false} position="bottom" buttonPosition="bottom-right" />
        )}
      </QueryClientProvider>
    </Suspense>
  );
}
