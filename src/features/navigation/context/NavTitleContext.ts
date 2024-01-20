import { createContext } from 'react';

export type NavTitleContextValue = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
};

export const NavTitleContext = createContext(null as unknown as NavTitleContextValue);
