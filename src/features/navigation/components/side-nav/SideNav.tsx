import { FaCarSide } from 'react-icons/fa';
import { TiHome } from 'react-icons/ti';
import { BsPersonCircle } from 'react-icons/bs';
import { IoMdSettings } from 'react-icons/io';
import { MdPersonAddAlt1 } from 'react-icons/md';
import { LiaFileContractSolid } from 'react-icons/lia';
import { RiMoneyPoundCircleFill } from 'react-icons/ri';
import { m, AnimatePresence, PanInfo } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { NavLogo } from '@/features/navigation/components/side-nav/NavLogo';
import { NavLink } from '@/features/navigation/components/side-nav/NavLink';
import { useIsNavOpen, useNavActions } from '@/features/navigation/state/navStore';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { LazyMotion } from '@/lib/framer-motion/LazyMotion';
import { cn } from '@/utils/cn';
import { Backdrop } from '@/ui/Backdrop';

const SWIPE_CONFIDENCE_THRESHOLD = 10000;
const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

export function SideNav() {
  const { pathname } = useLocation();
  const isMobileNavOpen = useIsNavOpen();
  const { closeNav, openNav } = useNavActions();
  const breakpoint = useBreakpoint('sm');
  const isNavOpen = isMobileNavOpen || breakpoint; // nav should always be open if greater than the `sm` breakpoint
  const isModalOpen = isMobileNavOpen && !breakpoint; // modal should only be allowed to open when smaller than the `sm` breakpoint

  function handleDragEnd(_event: Event, { offset, velocity }: PanInfo) {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -SWIPE_CONFIDENCE_THRESHOLD) {
      closeNav();
    } else if (swipe > SWIPE_CONFIDENCE_THRESHOLD) {
      openNav();
    }
  }

  return (
    <Backdrop isOpen={isModalOpen} onClose={closeNav} className="z-40">
      <LazyMotion>
        <AnimatePresence>
          <m.nav
            animate={{ x: isNavOpen ? 0 : '-110%', opacity: isNavOpen ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            drag={!breakpoint ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={{ left: isNavOpen ? 0.8 : -0.00001, right: isNavOpen ? -0.00001 : 0.8 }}
            onDragEnd={handleDragEnd}
            dragPropagation
            aria-label="primary"
            className={cn('flex flex-col w-64 sm:w-[7.125rem] md:w-64 h-dvh ml-0 sm:ml-5 pt-5 sm:pt-0 pb-5 fixed top-0 left-0 sm:left-[max(0px,calc(50%-48rem))] right-auto z-40 overflow-x-clip overflow-y-auto scrollbar-none bg-achromatic-lighter dark:bg-achromatic-dark sm:bg-transparent sm:dark:bg-transparent shadow-xl sm:shadow-none shadow-achromatic-darker/60', !isNavOpen && '[&>*]:hidden')}
          >
            <NavLogo />

            <div className={cn('bg-achromatic-lighter dark:bg-achromatic-dark rounded-lg pt-12 sm:py-8 flex flex-col gap-4 flex-1', breakpoint && 'shadow')}>
              <NavLink to="/home" icon={<TiHome />} active={pathname === '/home'} text="Home" />
              <NavLink to="/rents" icon={<RiMoneyPoundCircleFill />} active={pathname === '/rent'} text="Rent" />
              <NavLink to="/hires" icon={<LiaFileContractSolid />} active={pathname.startsWith('/hire')} text="Hires" />
              <NavLink to="/taxis" icon={<FaCarSide />} active={pathname.startsWith('/taxi')} text="Taxis" />
              <NavLink to="/drivers" icon={<BsPersonCircle />} active={pathname.startsWith('/driver') && !pathname.startsWith('/drivers/application')} text="Drivers" />
              <NavLink to="/drivers/applications" icon={<MdPersonAddAlt1 />} active={pathname.startsWith('/drivers/application')} text="Applications" className="overflow-hidden whitespace-nowrap text-ellipsis" />
              <NavLink to="/settings" icon={<IoMdSettings />} active={pathname === '/settings'} text="Settings" className="mt-auto" />
            </div>
          </m.nav>
        </AnimatePresence>
      </LazyMotion>
    </Backdrop>
  );
}
