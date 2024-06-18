import { QueryClient } from '@tanstack/react-query';
import { Outlet, redirect } from 'react-router-dom';
import { BasicContainer, ContentContainer } from '@/ui/Container';
import { Spinner } from '@/ui/Spinner';
import { SimpleTopNav } from '@/features/navigation/components/top-nav/SimpleTopNav';
import { createComponent } from '@/lib/react-router-dom/createComponent';
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
export const Component = createComponent(PublicOnlyLayoutComponent);
