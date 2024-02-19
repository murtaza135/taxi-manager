import { IoSearchOutline, IoMenu } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useNavActions } from '@/features/navigation/state/navStore';
import { useTitle } from '@/features/title/state/titleStore';
import { UserAvatar } from '@/features/navigation/components/top-nav/UserAvatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/ui/DropdownMenu';
import { useIsDarkmode, useDarkmodeActions } from '@/features/darkmode/state/darkmodeStore';
import { Switch } from '@/ui/Switch';

export function TopNav() {
  const title = useTitle();
  const isDarkmode = useIsDarkmode();
  const { toggleDarkmode } = useDarkmodeActions();
  const { toggleNav } = useNavActions();

  const handleToggleDarkMode = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    toggleDarkmode();
  };

  return (
    <div className="flex justify-between items-center gap-4 pl-0 sm:pl-[8.375rem] md:pl-[17.25rem] w-[min(calc(100%-2.5rem),calc(1536px-2.5rem))] h-20 fixed top-0 sm:left-[max(0,calc(50%-48rem))] z-20 bg-scene-light dark:bg-scene-dark text-primary-dark dark:text-primary-light">
      <div>
        <IoMenu
          className="sm:hidden text-3xl cursor-pointer hover:opacity-75 transition-opacity"
          onClick={() => toggleNav()}
        />
        <h2 className="hidden sm:block text-2xl">{title}</h2>
      </div>

      <div className="flex items-center gap-5">
        <IoSearchOutline className="text-2xl cursor-pointer hover:opacity-75 transition-opacity" />

        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <UserAvatar />
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel>Username</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleToggleDarkMode}
              className="flex gap-2 justify-center items-center"
            >
              <p className="translate-y-[1px]">Darkmode</p>
              <Switch checked={isDarkmode} />
            </DropdownMenuItem>
            <Link to="/settings">
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
