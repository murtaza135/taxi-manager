import { useEffect } from 'react';
import { titleHooks } from '@/features/title/state/titleStore';
import { config } from '@/app/config';

type Props = {
  title: string;
};

export function Title({ title }: Props) {
  const setTitle = titleHooks.useSetTitle();

  useEffect(() => {
    setTitle(title);

    return () => {
      setTitle('');
    };
  }, [title, setTitle]);

  useEffect(() => {
    const oldTitle = document.title;
    document.title = `${title} | ${config.APP_NAME}`;

    return () => {
      document.title = oldTitle;
    };
  }, [title]);

  return null;
}
