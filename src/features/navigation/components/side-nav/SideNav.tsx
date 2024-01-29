import { FaCarSide } from 'react-icons/fa';
import { TiHome } from 'react-icons/ti';
import { BsPersonCircle } from 'react-icons/bs';
import { IoMdSettings } from 'react-icons/io';
import { LiaFileContractSolid } from 'react-icons/lia';
import { RiMoneyPoundCircleFill } from 'react-icons/ri';
import { useTransition, animated } from '@react-spring/web';
import { useLocation } from 'wouter';
import { NavLogo } from '@/features/navigation/components/side-nav/NavLogo';
import { NavLink } from '@/features/navigation/components/side-nav/NavLink';
import { useIsNavOpen } from '@/features/navigation/state/navStore';
import { useBreakpoint } from '@/hooks/useBreakpoint';

export function SideNav() {
  const [location] = useLocation();
  const isMobileNavOpen = useIsNavOpen();
  const sm = useBreakpoint('sm');
  const isNavOpen = isMobileNavOpen || sm; // nav should always be open if greater than the `sm` breakpoint

  const transitions = useTransition([isNavOpen], {
    from: { transform: sm ? 'translateX(0%)' : 'translateX(-100%)' },
    enter: { transform: 'translateX(0%)' },
    leave: { transform: 'translateX(-100%)' },
  });

  return transitions((style, isOpen) => (
    isOpen && (
      <animated.nav
        aria-label="primary"
        style={style}
        className="flex flex-col min-w-64 sm:min-w-fit md:min-w-64 h-dvh fixed sm:sticky top-0 left-0 overflow-y-auto no-scrollbar overflow-x-clip pt-5 sm:pt-0 pb-5 z-40 bg-achromatic-light dark:bg-achromatic-dark sm:bg-transparent sm:dark:bg-transparent shadow-lg sm:shadow-none"
      >
        <NavLogo />

        <div className="bg-achromatic-light dark:bg-achromatic-dark rounded-lg pt-12 sm:py-8 flex flex-col gap-4 flex-1">
          <NavLink href="/" icon={<TiHome />} active={location === '/'} text="Dashboard" />
          <NavLink href="/rent" icon={<RiMoneyPoundCircleFill />} active={location === '/rent'} text="Rent" />
          <NavLink href="/hires" icon={<LiaFileContractSolid />} active={location === '/hires'} text="Hires" />
          <NavLink href="/taxis" icon={<FaCarSide />} active={location === '/taxis'} text="Taxis" />
          <NavLink href="/drivers" icon={<BsPersonCircle />} active={location === '/drivers'} text="Drivers" />
          <NavLink href="/settings" icon={<IoMdSettings />} active={location === '/settings'} text="Settings" className="mt-auto" />
        </div>
      </animated.nav>
    )
  ));
}
