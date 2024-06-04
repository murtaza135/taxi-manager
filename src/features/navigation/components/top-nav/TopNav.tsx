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
import { useLogout } from '@/features/auth/hooks/useLogout';
import { useCompany } from '@/features/auth/hooks/useCompany';
import { useCompanyLogo } from '@/features/auth/hooks/useCompanyLogo';
import { extractInitials } from '@/utils/string/extractInitials';
import { useBlobToImgSrc } from '@/hooks/useBlobToImgSrc';

export function TopNav() {
  const title = useTitle();
  const isDarkmode = useIsDarkmode();
  const { toggleDarkmode } = useDarkmodeActions();
  const { toggleNav } = useNavActions();
  const { mutate, isPending } = useLogout({ redirect: '/login' });
  const { data, isSuccess } = useCompany();
  const { data: logo } = useCompanyLogo();
  const src = useBlobToImgSrc(logo);

  const handleToggleDarkMode = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    toggleDarkmode();
  };

  const handleLogout = () => {
    if (!isPending) mutate();
  };

  return (
    <div className="flex justify-between items-center gap-4 w-full max-w-screen-2xl h-20 mx-auto pl-5 sm:pl-[9.625rem] md:pl-[18.5rem] pr-5 fixed top-0 left-0 right-0 z-20 bg-scene-light dark:bg-scene-dark text-primary-dark dark:text-primary-light">
      <div className="flex gap-4 items-center">
        <IoMenu
          className="sm:hidden text-3xl cursor-pointer hover:opacity-75 transition-opacity"
          onClick={() => toggleNav()}
        />
        <h2 className="text-2xl">{title}</h2>
      </div>

      <div className="flex items-center gap-5">
        <IoSearchOutline className="text-2xl cursor-pointer hover:opacity-75 transition-opacity" />

        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <Avatar className="hover:opacity-65 transition-opacity">
              <AvatarImage src={src} alt="user" />
              <AvatarFallback className="dark:text-achromatic-light">
                {extractInitials(data?.name ?? '')}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="min-w-[125px]">
            {isSuccess && (
              <>
                <DropdownMenuLabel>{data.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuItem
              onClick={handleToggleDarkMode}
              className="flex justify-between gap-4"
            >
              <span>{isDarkmode ? 'Dark Theme' : 'Light Theme'}</span>
              {isDarkmode
                ? <span className="text-base"><BsMoonStarsFill /></span>
                : <span className="text-lg -translate-y-[1px]"><BsSunFill /></span>}
            </DropdownMenuItem>
            <Link to="/settings">
              <DropdownMenuItem className="flex justify-between gap-4">
                <span>Settings</span>
                <span className="text-lg"><IoMdSettings /></span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <button
                onClick={handleLogout}
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
