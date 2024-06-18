import { QueryClient } from '@tanstack/react-query';
import { Outlet, redirect } from 'react-router-dom';
import { BasicContainer } from '@/ui/Container';
import { SimpleTopNav } from '@/features/navigation/components/top-nav/SimpleTopNav';
import { getLocalSession } from '@/features/auth/hooks/useLocalSession';

const publicOnlyLayoutLoader = (_queryClient: QueryClient) => () => {
  const session = getLocalSession();
  if (session) return redirect('/home');
  return null;
};

function PublicOnlyLayoutComponent() {
  return (
    <>
      <SimpleTopNav />
      <BasicContainer>
        <Outlet />
      </BasicContainer>
    </>
  );
}

export const loader = publicOnlyLayoutLoader;
export const Component = PublicOnlyLayoutComponent;
