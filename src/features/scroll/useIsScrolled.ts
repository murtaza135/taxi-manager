import { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';

export function useIsScrolled() {
  const [isXScrolled, setIsXScrolled] = useState(false);
  const [isYScrolled, setIsYScrolled] = useState(false);

  useEffect(() => {
    // TODO replace debounce with a simple setTimeout?
    // TODO otherwise return cleanup of debounce function (onScroll.cancel)
    const onScroll = debounce(() => {
      setIsXScrolled(window.scrollX > 0);
      setIsYScrolled(window.scrollY > 0);
    }, 250);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [setIsXScrolled, setIsYScrolled]);

  return { x: isXScrolled, y: isYScrolled } as const;
}
