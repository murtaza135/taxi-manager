import { useEffect } from 'react';
import { useNavTitle } from './useNavTitle';

export function useNavTitleValue(title: string) {
  const { setTitle } = useNavTitle();

  useEffect(() => {
    setTitle(title);
    return () => setTitle('');
  }, [title, setTitle]);
}
