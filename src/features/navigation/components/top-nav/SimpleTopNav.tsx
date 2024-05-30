import { IoSearchOutline, IoMenu } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { IoMdSettings } from 'react-icons/io';
import { MdLogout } from 'react-icons/md';
import { BsSunFill, BsMoonStarsFill } from 'react-icons/bs';
import { useNavActions } from '@/features/navigation/state/navStore';
import { useTitle } from '@/features/title/state/titleStore';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/Avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/ui/DropdownMenu';
import { useIsDarkmode, useDarkmodeActions } from '@/features/darkmode/state/darkmodeStore';
import { Button } from '@/ui/Button';

export function SimpleTopNav() {
  const isDarkmode = useIsDarkmode();
  const { toggleDarkmode } = useDarkmodeActions();

  const handleToggleDarkMode = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    toggleDarkmode();
  };

  return (
    <div className="flex justify-between items-center gap-4 w-full max-w-screen-2xl h-16 mx-auto pl-5 pr-5 fixed top-0 left-0 right-0 z-20 bg-primary-dark dark:bg-achromatic-dark text-white dark:text-primary-light">
      <div />

      <div className="flex items-center gap-5 translate-y-[1px]">
        <Button
          type="button"
          variant="ghost"
          shape="circle"
          size="sm"
          onClick={handleToggleDarkMode}
        // className="bg-primary-dark dark:bg-primary-light text-white dark:text-scene-dark"
        >
          {isDarkmode
            ? <span className="text-base"><BsMoonStarsFill /></span>
            : <span className="text-lg"><BsSunFill /></span>}
        </Button>
      </div>
    </div>
  );
}
