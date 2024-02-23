import * as React from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import { cn } from '@/utils/cn';

type BackdropProps = {
  isOpen: boolean;
  onClose?: () => void;
};

const Backdrop = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & BackdropProps
>(({ isOpen, onClose, className, children, ...props }, ref) => (
  <>
    {isOpen && (
      <div
        ref={ref}
        className={cn('fixed top-0 left-0 bottom-0 right-0 w-dvw h-dvh bg-black/80 z-50 touch-none overflow-hidden', className)}
        onClick={() => onClose?.()}
        role="presentation"
        {...props}
      />
    )}

    <RemoveScroll enabled={isOpen}>
      {children}
    </RemoveScroll>
  </>
));
Backdrop.displayName = 'Backdrop';

export { Backdrop };
