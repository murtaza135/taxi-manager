import { FaCarSide } from 'react-icons/fa';
import { TiHome } from 'react-icons/ti';
import { BsPersonCircle } from 'react-icons/bs';
import { IoMdSettings } from 'react-icons/io';
import { LiaFileContractSolid } from 'react-icons/lia';
import { RiMoneyPoundCircleFill } from 'react-icons/ri';
import { useLocation } from 'wouter';
import { m, AnimatePresence, PanInfo } from 'framer-motion';
import { NavLogo } from '@/features/navigation/components/side-nav/NavLogo';
import { NavLink } from '@/features/navigation/components/side-nav/NavLink';
import { useIsNavOpen, useNavActions } from '@/features/navigation/state/navStore';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { LazyMotion } from '@/app/framer-motion/LazyMotion';
import { cn } from '@/utils/cn';

const SWIPE_CONFIDENCE_THRESHOLD = 10000;
const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

export function SideNav() {
  const [location] = useLocation();
  const isMobileNavOpen = useIsNavOpen();
  const { closeNav, openNav } = useNavActions();
  const breakpoint = useBreakpoint('sm');
  const isNavOpen = isMobileNavOpen || breakpoint; // nav should always be open if greater than the `sm` breakpoint

  function handleDragEnd(_event: Event, { offset, velocity }: PanInfo) {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -SWIPE_CONFIDENCE_THRESHOLD) {
      closeNav();
    } else if (swipe > SWIPE_CONFIDENCE_THRESHOLD) {
      openNav();
    }
  }

  return (
    <LazyMotion>
      <AnimatePresence>
        <m.nav
          initial={{ x: isNavOpen ? 0 : '-15rem', opacity: 0 }}
          animate={{ x: isNavOpen ? 0 : '-15rem', opacity: isNavOpen ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          drag={!breakpoint ? 'x' : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={{ left: isNavOpen ? 0.8 : -0.00001, right: isNavOpen ? -0.00001 : 0.8 }}
          onDragEnd={handleDragEnd}
          dragPropagation
          aria-label="primary"
          className={cn('flex flex-col min-w-64 sm:min-w-fit md:min-w-64 h-dvh fixed sm:sticky top-0 left-0 overflow-y-auto no-scrollbar overflow-x-clip pt-5 sm:pt-0 pb-5 z-40 bg-achromatic-light dark:bg-achromatic-dark sm:bg-transparent sm:dark:bg-transparent shadow-xl sm:shadow-none shadow-scene-dark/60', !isNavOpen && '[&>*]:hidden')}
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
        </m.nav>
      </AnimatePresence>
    </LazyMotion>
  );
}
