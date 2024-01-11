import { useContext } from 'react';
import { NavContext } from '../context/NavContext';

export function useNav() {
  const context = useContext(NavContext);

  if (context === undefined) {
    throw new Error('No nav context provided');
  }

  return context;
}
