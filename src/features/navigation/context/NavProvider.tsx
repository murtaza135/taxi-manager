import { ReactNode, useState, useMemo, useCallback } from 'react';
import { NavContext, NavContextValue } from './NavContext';

type Props = {
  children: ReactNode;
};

export function NavProvider({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [setIsOpen]);

  const value: NavContextValue = useMemo(() => ({
    isOpen, open, close, toggle,
  }), [isOpen, open, close, toggle]);

  return (
    <NavContext.Provider value={value}>
      {children}
    </NavContext.Provider>
  );
}
