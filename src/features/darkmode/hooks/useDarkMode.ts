import { useContext } from 'react';
import { DarkModeContext } from '../context/DarkModeContext';

export function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (context === undefined) {
    throw new Error('No dark mode context provided');
  }

  return context;
}
