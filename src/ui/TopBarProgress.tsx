import TopBarProgress from 'react-topbar-progress-indicator';

function configureTopBarProgress(isDarkmode: boolean) {
  TopBarProgress.config({
    barColors: {
      0: isDarkmode ? '#7dd3fc' : '#0284c7',
      '1.0': isDarkmode ? '#7dd3fc' : '#0284c7',
    },
    barThickness: 4,
    shadowBlur: 2,
  });
}

export {
  configureTopBarProgress,
  TopBarProgress,
};
