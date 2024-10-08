import { useEffect } from 'react';
import { useTitleStore, useTitleActions } from '@/features/title/state/titleStore';
import { config } from '@/config/config';

export function useDocumentTitle(title: string) {
  const { setTitle } = useTitleActions();

  // set title in titleStore
  useEffect(() => {
    const oldTitle = useTitleStore.getState().title;
    setTitle(title);

    return () => {
      setTitle(oldTitle);
    };
  }, [title, setTitle]);

  // set the document title
  useEffect(() => {
    const oldTitle = document.title;
    document.title = `${title} | ${config.appName}`;

    return () => {
      document.title = oldTitle;
    };
  }, [title]);
}
