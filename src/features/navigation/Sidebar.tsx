import { FaCarAlt, FaCarSide } from 'react-icons/fa';
import { TiHome } from 'react-icons/ti';
import { MdFace6 } from 'react-icons/md';
import { LiaFileContractSolid } from 'react-icons/lia';
import { RiMoneyPoundCircleFill } from 'react-icons/ri';
import { useLocation } from 'wouter';
import { NavLink } from './NavLink';

export function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="hidden sm:flex flex-col md:min-w-64 h-dvh sticky top-0">
      <div className="text-4xl md:text-3xl font-cursive flex items-center gap-3 min-h-20 self-center md:self-start">
        <FaCarAlt />
        <p className="hidden md:inline text-2xl">Taxi Manager</p>
      </div>

      <div className="bg-light-100 dark:bg-dark-800 rounded-lg min-h-[87dvh] py-12 flex flex-col gap-4">
        <NavLink href="/" icon={<TiHome />} active={location === '/'} text="Dashboard" />
        <NavLink href="/rent" icon={<RiMoneyPoundCircleFill />} active={location === '/rent'} text="Rent" />
        <NavLink href="/hires" icon={<LiaFileContractSolid />} active={location === '/hires'} text="Hires" />
        <NavLink href="/taxis" icon={<FaCarSide />} active={location === '/taxis'} text="Taxis" />
        <NavLink href="/drivers" icon={<MdFace6 />} active={location === '/drivers'} text="Drivers" />
      </div>
    </div>
  );
}
