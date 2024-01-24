import { IoSearchOutline, IoMenu } from 'react-icons/io5';
import { useNavActions } from '@/features/navigation/state/navStore';
import { useTitle } from '@/features/title/state/titleStore';
import { UserAvatar } from '@/features/navigation/components/top-nav/UserAvatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/ui/DropdownMenu';
import { NavDropdownMenuItems } from '@/features/navigation/components/top-nav/NavDropdownMenuItems';

export function TopNav() {
  const { toggleNav } = useNavActions();
  const title = useTitle();

  return (
    <div className="flex justify-between items-center gap-4 min-h-20 sticky top-0 left-0 z-20 bg-light-2 dark:bg-dark-2 text-primary-2 dark:text-primary-1">
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
            <NavDropdownMenuItems />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
