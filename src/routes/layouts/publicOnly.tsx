import { Outlet } from 'react-router-dom';
import { BasicContainer } from '@/ui/Container';
import { SimpleTopNav } from '@/features/navigation/components/top-nav/SimpleTopNav';

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

export const Component = PublicOnlyLayoutComponent;
