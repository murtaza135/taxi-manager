import { FaCarAlt, FaCarSide } from 'react-icons/fa';
import { TiHome } from 'react-icons/ti';
import { MdFace6 } from 'react-icons/md';
import { LiaFileContractSolid } from 'react-icons/lia';
import { RiMoneyPoundCircleFill } from 'react-icons/ri';
import { useLocation, Link } from 'wouter';
import { IoMdSettings } from 'react-icons/io';
import { useTransition, animated } from '@react-spring/web';
import { NavLink } from './NavLink';
import { navHooks } from '../state/navStore';
import { useBreakpoint } from '@/hooks/useBreakpoint';

export function SideNav() {
  const [location] = useLocation();
  const close = navHooks.useClose();
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
        <animated.nav aria-label="primary" style={style} className="flex flex-col min-w-64 sm:min-w-fit md:min-w-64 h-dvh fixed sm:sticky top-0 left-0 overflow-y-auto no-scrollbar overflow-x-clip pt-5 sm:pt-0 pb-5 z-40 bg-light-100 dark:bg-dark-800 sm:bg-transparent sm:dark:bg-transparent shadow-lg sm:shadow-none">
          <Link href="/" onClick={() => close()} className="text-3xl sm:text-4xl md:text-3xl font-cursive flex items-center self-center md:self-start gap-3 min-h-20 hover:opacity-65 transition-opacity">
            <FaCarAlt />
            <p className="inline sm:hidden md:inline text-2xl">Taxi Manager</p>
          </Link>

          <div className="bg-light-100 dark:bg-dark-800 rounded-lg pt-12 sm:py-8 flex flex-col gap-4 flex-1">
            <NavLink href="/" icon={<TiHome />} active={location === '/'} text="Dashboard" />
            <NavLink href="/rent" icon={<RiMoneyPoundCircleFill />} active={location === '/rent'} text="Rent" />
            <NavLink href="/hires" icon={<LiaFileContractSolid />} active={location === '/hires'} text="Hires" />
            <NavLink href="/taxis" icon={<FaCarSide />} active={location === '/taxis'} text="Taxis" />
            <NavLink href="/drivers" icon={<MdFace6 />} active={location === '/drivers'} text="Drivers" />
            <NavLink href="/settings" icon={<IoMdSettings />} active={location === '/settings'} text="Settings" className="mt-auto" />
          </div>
        </animated.nav>
      )
      : null
  ));
}
