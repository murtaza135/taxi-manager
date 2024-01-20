import { useContext } from 'react';
import { NavTitleContext } from '../context/NavTitleContext';

export function useNavTitle() {
  const context = useContext(NavTitleContext);

  if (context === undefined) {
    throw new Error('No nav title context provided');
  }

  return context;
}
