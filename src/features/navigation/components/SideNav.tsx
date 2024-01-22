import { FaCarSide } from 'react-icons/fa';
import { TiHome } from 'react-icons/ti';
import { BsPersonCircle } from 'react-icons/bs';
import { IoMdSettings } from 'react-icons/io';
import { LiaFileContractSolid } from 'react-icons/lia';
import { RiMoneyPoundCircleFill } from 'react-icons/ri';
import { useTransition, animated } from '@react-spring/web';
import { useLocation } from 'wouter';
import { NavLink } from './NavLink';
import { navHooks } from '../state/navStore';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { NavLogo } from './NavLogo';

export function SideNav() {
  const [location] = useLocation();
  const isMobileNavOpen = navHooks.useIsOpen();
  const sm = useBreakpoint('sm');
  const isNavOpen = isMobileNavOpen || sm; // nav should always be open if greater than the `sm` breakpoint

  const transitions = useTransition([isNavOpen], {
    from: { transform: sm ? 'translateX(0rem)' : 'translateX(-16rem)' },
    enter: { transform: 'translateX(0rem)' },
    leave: { transform: 'translateX(-16rem)' },
  });

  return transitions((style, isOpen) => (
    isOpen
      ? (
        <animated.nav aria-label="primary" style={style} className="flex flex-col min-w-64 sm:min-w-fit md:min-w-64 h-dvh fixed sm:sticky top-0 left-0 overflow-y-auto no-scrollbar overflow-x-clip pt-5 sm:pt-0 pb-5 z-40 bg-light-1 dark:bg-dark-1 sm:bg-transparent sm:dark:bg-transparent shadow-lg sm:shadow-none">
          <NavLogo />

          <div className="bg-light-1 dark:bg-dark-1 rounded-lg pt-12 sm:py-8 flex flex-col gap-4 flex-1">
            <NavLink href="/" icon={<TiHome />} active={location === '/'} text="Dashboard" />
            <NavLink href="/rent" icon={<RiMoneyPoundCircleFill />} active={location === '/rent'} text="Rent" />
            <NavLink href="/hires" icon={<LiaFileContractSolid />} active={location === '/hires'} text="Hires" />
            <NavLink href="/taxis" icon={<FaCarSide />} active={location === '/taxis'} text="Taxis" />
            <NavLink href="/drivers" icon={<BsPersonCircle />} active={location === '/drivers'} text="Drivers" />
            <NavLink href="/settings" icon={<IoMdSettings />} active={location === '/settings'} text="Settings" className="mt-auto" />
          </div>
        </animated.nav>
      )
      : null
  ));
}
