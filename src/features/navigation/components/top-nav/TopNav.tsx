import { IoSearchOutline, IoMenu } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { IoMdSettings } from 'react-icons/io';
import { MdLogout } from 'react-icons/md';
import { useNavActions } from '@/features/navigation/state/navStore';
import { useTitle } from '@/features/title/state/titleStore';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/Avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/ui/DropdownMenu';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { useCompany } from '@/features/auth/hooks/useCompany';
import { useCompanyLogo } from '@/features/auth/hooks/useCompanyLogo';
import { extractInitials } from '@/utils/string/extractInitials';
import { capitalizeEachWord } from '@/utils/string/capitalizeEachWord';
import { SimpleDarkmodeSwitch } from '@/features/darkmode/components/SimpleDarkmodeSwitch';

export function TopNav() {
  const title = useTitle();
  const { toggleNav } = useNavActions();
  const { mutate: logout } = useLogout({ redirect: '/login' });
  const { data } = useCompany();
  const { data: src } = useCompanyLogo();

  return (
    <div className="flex justify-between items-center gap-4 w-full max-w-screen-2xl h-20 mx-auto pl-5 sm:pl-[9.625rem] md:pl-[18.5rem] pr-5 fixed top-0 left-0 right-0 z-20 bg-achromatic-light dark:bg-achromatic-darker text-primary-dark dark:text-primary-light">
      <div className="flex gap-4 items-center overflow-hidden whitespace-nowrap overflow-ellipsis">
        <IoMenu
          className="sm:hidden text-3xl cursor-pointer hover:opacity-75 transition-opacity flex-shrink-0"
          onClick={() => toggleNav()}
        />
        <h2 className="text-2xl inline-block overflow-hidden whitespace-nowrap overflow-ellipsis">{title}</h2>
      </div>

      <div className="flex items-center gap-5 bg-achromatic-lighter dark:bg-achromatic-dark px-4 py-2 rounded-lg">
        <IoSearchOutline className="text-xl cursor-pointer hover:opacity-75 transition-opacity" />
        <SimpleDarkmodeSwitch />

        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <Avatar className="hover:opacity-65 transition-opacity">
              {src && <AvatarImage src={src} alt="user" />}
              <AvatarFallback className="">
                {extractInitials(data.name ?? '')}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="min-w-[125px]">
            <DropdownMenuLabel>{capitalizeEachWord(data.name)}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link to="/settings">
              <DropdownMenuItem className="flex justify-between gap-4">
                <span>Settings</span>
                <span className="text-lg"><IoMdSettings /></span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem>
              <button
                onClick={() => logout()}
                type="button"
                className="w-full flex justify-between gap-4"
              >
                <span>Logout</span>
                <span className="text-lg"><MdLogout /></span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
