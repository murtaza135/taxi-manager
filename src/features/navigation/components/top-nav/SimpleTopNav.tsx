import { MdLogout } from 'react-icons/md';
import { useLocalSession } from '@/features/auth/hooks/useLocalSession';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { Button } from '@/ui/Button';
import { SimpleDarkmodeSwitch } from '@/features/darkmode/components/SimpleDarkmodeSwitch';
import { NavLogo } from '@/features/navigation/components/top-nav/NavLogo';

export function SimpleTopNav() {
  const session = useLocalSession();
  const { mutate: logout } = useLogout({ redirect: '/login' });

  return (
    <div className="bg-primary-dark dark:bg-achromatic-dark h-16 w-full fixed top-0 left-0 right-0">
      <div className="flex justify-between items-center gap-4 w-full max-w-screen-2xl h-16 mx-auto pl-6 pr-6 z-20 text-white dark:text-primary-light">
        <NavLogo />

        <div className="flex items-center gap-3 translate-y-[2px]">
          <SimpleDarkmodeSwitch />
          {session && (
            <Button
              type="button"
              variant="ghost"
              shape="circle"
              size="sm"
              onClick={() => logout()}
              className="text-xl"
            >
              <MdLogout />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
