import { BsSunFill, BsMoonStarsFill } from 'react-icons/bs';
import { MdLogout } from 'react-icons/md';
import { useIsDarkmode, useDarkmodeActions } from '@/features/darkmode/state/darkmodeStore';
import { useLocalSession } from '@/features/auth/hooks/useLocalSession';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { Button } from '@/ui/Button';

export function SimpleTopNav() {
  const session = useLocalSession();
  const isDarkmode = useIsDarkmode();
  const { toggleDarkmode } = useDarkmodeActions();
  const { mutate: logout } = useLogout({ redirect: '/login' });

  const handleToggleDarkMode = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    toggleDarkmode();
  };

  return (
    <div className="flex justify-between items-center gap-4 w-full max-w-screen-2xl h-16 mx-auto pl-6 pr-6 fixed top-0 left-0 right-0 z-20 bg-primary-dark dark:bg-achromatic-dark text-white dark:text-primary-light">
      <div />

      <div className="flex items-center gap-3 translate-y-[2px]">
        <Button
          type="button"
          variant="ghost"
          shape="circle"
          size="sm"
          onClick={handleToggleDarkMode}
        >
          {isDarkmode
            ? <span className="text-base"><BsMoonStarsFill /></span>
            : <span className="text-lg"><BsSunFill /></span>}
        </Button>
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
  );
}
