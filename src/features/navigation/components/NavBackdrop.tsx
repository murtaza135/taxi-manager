import { ReactNode, useEffect } from 'react';
import { useNav } from '../hooks/useNav';
import { cn } from '@/util/cn';

type Props = {
  children?: ReactNode;
};

export function NavBackdrop({ children }: Props) {
  const { isOpen, close } = useNav();

  // stop the body from scrolling when the backdrop is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isOpen]);

  return (
    <div
      onClick={() => close()}
      role="none"
      className={cn('sm:hidden fixed top-0 left-0 w-dvw h-dvh backdrop-blur-sm z-30 touch-none overflow-hidden', isOpen ? 'block' : 'hidden')}
    >
      {children}
    </div>
  );
}
