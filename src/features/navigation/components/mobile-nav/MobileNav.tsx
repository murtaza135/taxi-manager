import { FaCarSide } from 'react-icons/fa';
import { TiHome } from 'react-icons/ti';
import { BsPersonCircle } from 'react-icons/bs';
import { LiaFileContractSolid } from 'react-icons/lia';
import { RiMoneyPoundCircleFill } from 'react-icons/ri';
import { useLocation } from 'react-router-dom';
import { MobileNavLink } from '@/features/navigation/components/mobile-nav/MobileNavLink';

export function MobileNav() {
  const { pathname } = useLocation();

  return (
    <nav
      aria-label="mobile-only"
      className="fixed bottom-0 left-0 right-0 translate-y-[1px] w-100 z-30 border-t-[1px] bg-primary-dark border-achromatic-light dark:bg-scene-dark dark:border-primary-light"
    >
      <div className="flex justify-around items-center">
        <MobileNavLink to="/rent" icon={<RiMoneyPoundCircleFill />} active={pathname === '/rent'} text="Rent" />
        <MobileNavLink to="/hires" icon={<LiaFileContractSolid />} active={pathname === '/hires'} text="Hires" />
        <MobileNavLink to="/" icon={<TiHome />} active={pathname === '/'} text="Home" />
        <MobileNavLink to="/taxis" icon={<FaCarSide />} active={pathname === '/taxis'} text="Taxis" />
        <MobileNavLink to="/drivers" icon={<BsPersonCircle />} active={pathname === '/drivers'} text="Drivers" />
      </div>
    </nav>
  );
}
