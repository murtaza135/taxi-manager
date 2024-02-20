import * as React from 'react';
import { cn } from '@/utils/cn';

type BackdropProps = {
  isOpen: boolean;
  onClose?: () => void;
};

const Backdrop = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & BackdropProps
>(({ isOpen, onClose, className, ...props }, ref) => {
  // stop the body from scrolling when the backdrop is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isOpen]);

  return (
    <div
      ref={ref}
      className={cn('sm:hidden fixed top-0 left-0 bottom-0 right-0 w-dvw h-dvh backdrop-blur-sm z-30 touch-none overflow-hidden', isOpen ? 'block' : 'hidden', className)}
      onClick={() => onClose?.()}
      role="presentation"
      {...props}
    />
  );
});
Backdrop.displayName = 'Backdrop';

export { Backdrop };
