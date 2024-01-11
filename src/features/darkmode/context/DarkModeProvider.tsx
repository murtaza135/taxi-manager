import { ReactNode, useEffect, useMemo, useCallback } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { DarkModeContext, DarkModeContextValue } from './DarkModeContext';

type Props = {
  children: ReactNode;
};

export function DarkModeProvider({ children }: Props) {
  const [isDarkMode, setIsDarkMode] = useLocalStorage('darkmode', false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const enable = useCallback(() => {
    setIsDarkMode(true);
  }, [setIsDarkMode]);

  const disable = useCallback(() => {
    setIsDarkMode(false);
  }, [setIsDarkMode]);

  const toggle = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, [setIsDarkMode]);

  const value: DarkModeContextValue = useMemo(() => ({
    isDarkMode, enable, disable, toggle,
  }), [isDarkMode, enable, disable, toggle]);

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
}
