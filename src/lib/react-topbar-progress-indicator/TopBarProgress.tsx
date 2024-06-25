import TopBarProgressBase from 'react-topbar-progress-indicator';
import { useEffect } from 'react';
import { useIsDarkmode } from '@/features/darkmode/state/darkmodeStore';

export function TopBarProgress() {
  const isDarkmode = useIsDarkmode();

  useEffect(() => {
    if (isDarkmode) {
      TopBarProgressBase.config({
        barColors: {
          0: '#7dd3fc',
          '1.0': '#7dd3fc',
        },
        barThickness: 4,
        shadowBlur: 2,
      });
    } else {
      TopBarProgressBase.config({
        barColors: {
          0: '#0284c7',
          '1.0': '#0284c7',
        },
        barThickness: 4,
        shadowBlur: 2,
      });
    }
  }, [isDarkmode]);

  return <TopBarProgressBase />;
}
