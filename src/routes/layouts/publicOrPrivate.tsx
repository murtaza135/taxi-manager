import { QueryClient } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import { BasicContainer } from '@/ui/Container';
import { SimpleTopNav } from '@/features/navigation/components/top-nav/SimpleTopNav';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { getLocalSession } from '@/features/auth/hooks/useLocalSession';

const publicOrPrivateLayoutLoader = (queryClient: QueryClient) => () => {
  const session = getLocalSession();
  if (session) void queryClient.prefetchQuery(sessionOptions());
  return null;
};

function PublicOrPrivateLayoutComponent() {
  return (
    <>
      <SimpleTopNav disableLink />
      <BasicContainer>
        <Outlet />
      </BasicContainer>
    </>
  );
}

export const loader = publicOrPrivateLayoutLoader;
export const Component = PublicOrPrivateLayoutComponent;
