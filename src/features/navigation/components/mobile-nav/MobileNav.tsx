import { FaCarSide } from 'react-icons/fa';
import { TiHome } from 'react-icons/ti';
import { RiMoneyPoundCircleFill } from 'react-icons/ri';
import { useLocation } from 'react-router-dom';
import { IoDocumentText, IoMenu } from 'react-icons/io5';
import { MobileNavLink } from '@/features/navigation/components/mobile-nav/MobileNavLink';
import { useMobilePWA } from '@/hooks/useMobilePWA';
import { MobileNavButton } from '@/features/navigation/components/mobile-nav/MobileNavButton';
import { useNavActions } from '@/features/navigation/state/navStore';

export function MobileNav() {
  const { pathname } = useLocation();
  const isMobilePWA = useMobilePWA();
  const { toggleNav } = useNavActions();

  return isMobilePWA && (
    <nav
      aria-label="mobile-only"
      className="fixed bottom-0 left-0 right-0 translate-y-[1px] w-100 z-30 border-t-[1px] bg-achromatic-lighter border-achromatic-light dark:bg-achromatic-dark dark:border-achromatic-darker"
    >
      <div className="flex justify-around items-center">
        <MobileNavLink to="/rents" icon={<RiMoneyPoundCircleFill />} active={pathname.startsWith('/rent')} text="Rent" />
        <MobileNavLink to="/hires" icon={<IoDocumentText className="text-[1.375rem]" />} active={pathname.startsWith('/hire')} text="Hires" />
        <MobileNavLink to="/" icon={<TiHome />} active={pathname === '/home'} text="Home" />
        <MobileNavLink to="/taxis" icon={<FaCarSide />} active={pathname.startsWith('/taxi')} text="Taxis" />
        <MobileNavButton onClick={() => toggleNav()} icon={<IoMenu />} text="More" />
      </div>
    </nav>
  );
}
