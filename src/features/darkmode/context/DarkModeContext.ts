import { createContext } from 'react';

export type DarkModeContextValue = {
  isDarkMode: boolean;
  enable: () => void;
  disable: () => void;
  toggle: () => void;
};

export const DarkModeContext = createContext(null as unknown as DarkModeContextValue);
