import { ReactNode, useEffect } from 'react';
import { useIsNavOpen, useNavActions } from '@/features/navigation/state/navStore';
import { cn } from '@/utils/cn';

type Props = {
  children?: ReactNode;
};

export function NavBackdrop({ children }: Props) {
  const isNavOpen = useIsNavOpen();
  const { closeNav } = useNavActions();

  // stop the body from scrolling when the backdrop is open
  useEffect(() => {
    if (isNavOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isNavOpen]);

  return (
    <div
      onClick={() => closeNav()}
      role="none"
      className={cn('sm:hidden fixed top-0 left-0 w-dvw h-dvh backdrop-blur-sm z-30 touch-none overflow-hidden', isNavOpen ? 'block' : 'hidden')}
    >
      {children}
    </div>
  );
}
