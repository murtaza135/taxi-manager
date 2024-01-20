import { ReactNode, useState, useMemo } from 'react';
import { NavTitleContext, NavTitleContextValue } from './NavTitleContext';

type Props = {
  children: ReactNode;
};

export function NavTitleProvider({ children }: Props) {
  const [title, setTitle] = useState('');

  const value: NavTitleContextValue = useMemo(() => ({
    title, setTitle,
  }), [title, setTitle]);

  return (
    <NavTitleContext.Provider value={value}>
      {children}
    </NavTitleContext.Provider>
  );
}
