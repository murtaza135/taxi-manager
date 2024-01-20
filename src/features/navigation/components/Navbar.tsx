import { IoSearchOutline, IoMenu } from 'react-icons/io5';
import { useLocation } from 'wouter';
import { DarkModeButton } from '@/features/darkmode/components/DarkModeButton';
import { Avatar } from '@/features/ui/Avatar';
import { useNav } from '../hooks/useNav';
import { useNavTitle } from '../hooks/useNavTitle';
import { useDarkMode } from '@/features/darkmode/hooks/useDarkMode';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/features/ui/DropdownMenu';

export function Navbar() {
  const { toggle: toggleNav } = useNav();
  const { title } = useNavTitle();
  const { toggle: toggleDarkMode } = useDarkMode();
  const [, setLocation] = useLocation();

  const handleToggleDarkMode = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.preventDefault();
    toggleDarkMode();
  };

  return (
    <div className="flex justify-between items-center gap-4 min-h-20 sticky top-0 left-0 z-20 bg-light-200 dark:bg-dark-900">
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
          <DropdownMenuTrigger>
            <Avatar alt="User" />
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel>Username</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="flex gap-4 justify-center items-center"
              onClick={(event) => handleToggleDarkMode(event)}
            >
              <p className="translate-y-0.5">Darkmode</p>
              <DarkModeButton />
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setLocation('/settings')}>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
