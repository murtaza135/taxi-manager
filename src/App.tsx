import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BasicContainer } from '@/ui/Container';
import { Spinner } from '@/ui/Spinner';
import { router } from '@/config/router';
import { queryClient } from '@/config/api/queryClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { useDarkmodeStore } from '@/features/darkmode/state/darkmodeStore';
import { applyTheme } from '@/features/darkmode/utils/applyTheme';
import { configureTopBarProgress } from '@/ui/TopBarProgress';
import { config } from '@/config/config';
import '@/styles/main.css';

void queryClient.prefetchQuery(sessionOptions());
applyTheme();
configureTopBarProgress(useDarkmodeStore.getState().isDarkmode);
useDarkmodeStore.subscribe(
  (state) => state.isDarkmode,
  (isDarkmode) => configureTopBarProgress(isDarkmode),
);

export function App() {
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
        {!config.env.PROD && (
          <ReactQueryDevtools
            initialIsOpen={false}
            position="bottom"
            buttonPosition="bottom-left"
          />
        )}
      </QueryClientProvider>
    </Suspense>
  );
}
