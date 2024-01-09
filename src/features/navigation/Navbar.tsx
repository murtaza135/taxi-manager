import { IoSearchOutline } from 'react-icons/io5';
import { DarkModeButton } from '@/features/darkmode/DarkModeButton';
import { Avatar } from '@/features/ui/Avatar/Avatar';

export function Navbar() {
  return (
    <div className="flex items-center justify-end gap-4 min-h-20 sticky top-0 bg-light-200 dark:bg-dark-900">
      <div className="flex items-center gap-5">
        <IoSearchOutline className="text-2xl cursor-pointer" />
        <DarkModeButton />
        <Avatar alt="User" />
      </div>
    </div>
  );
}
