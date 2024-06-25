import TopBarProgress from 'react-topbar-progress-indicator';
import { useEffect } from 'react';
import { useIsDarkmode } from '@/features/darkmode/state/darkmodeStore';

function useTopBarProgressConfiguration() {
  const isDarkmode = useIsDarkmode();

  useEffect(() => {
    TopBarProgress.config({
      barColors: {
        0: isDarkmode ? '#7dd3fc' : '#0284c7',
        '1.0': isDarkmode ? '#7dd3fc' : '#0284c7',
      },
      barThickness: 4,
      shadowBlur: 2,
    });
  }, [isDarkmode]);
}

export {
  useTopBarProgressConfiguration,
  TopBarProgress,
};
