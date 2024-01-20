import { IoSearchOutline, IoMenu } from 'react-icons/io5';
import { DarkModeButton } from '@/features/darkmode/components/DarkModeButton';
import { Avatar } from '@/features/ui/Avatar';
import { useNav } from '../hooks/useNav';
import { useNavTitle } from '../hooks/useNavTitle';

export function Navbar() {
  const { toggle } = useNav();
  const { title } = useNavTitle();

  return (
    <div className="flex justify-between items-center gap-4 min-h-20 sticky top-0 left-0 z-20 bg-light-200 dark:bg-dark-900">
      <div>
        <IoMenu
          className="sm:hidden text-3xl cursor-pointer hover:opacity-75 transition-opacity"
          onClick={() => toggle()}
        />
        <h2 className="hidden sm:block text-2xl">{title}</h2>
      </div>

      <div className="flex items-center gap-5">
        <IoSearchOutline className="text-2xl cursor-pointer hover:opacity-75 transition-opacity" />
        <DarkModeButton />
        <Avatar alt="User" />
      </div>
    </div>
  );
}
