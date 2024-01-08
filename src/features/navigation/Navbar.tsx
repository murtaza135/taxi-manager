import { IoSearchOutline } from 'react-icons/io5';
import { FaCarAlt } from 'react-icons/fa';
import { DarkModeButton } from '@/features/darkmode/DarkModeButton';
import { Avatar } from '@/features/ui/Avatar/Avatar';

export function Navbar() {
  return (
    <div className="container mx-auto px-4 flex items-center justify-between gap-4 min-h-20">
      <div className="text-3xl font-cursive flex items-center gap-3">
        <FaCarAlt />
        <p className="text-2xl">Taxi Manager</p>
      </div>
      <div className="flex items-center gap-5">
        <IoSearchOutline className="text-2xl cursor-pointer" />
        <DarkModeButton />
        <Avatar alt="User" />
      </div>
    </div>
  );
}
