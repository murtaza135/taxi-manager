import { createContext } from 'react';

export type NavContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export const NavContext = createContext(null as unknown as NavContextValue);
