import TopBarProgressComponent from 'react-topbar-progress-indicator';
import { useNavigation, useRevalidator } from 'react-router-dom';
import { useIsMutating } from '@tanstack/react-query';

function configureTopBarProgress(isDarkmode: boolean) {
  TopBarProgressComponent.config({
    barColors: {
      0: isDarkmode ? '#7dd3fc' : '#0284c7',
      '1.0': isDarkmode ? '#7dd3fc' : '#0284c7',
    },
    barThickness: 4,
    shadowBlur: 2,
  });
}

function TopBarProgress() {
  const { state: navigationState } = useNavigation(); // when loaders invoked via navigation
  const { state: revalidatorState } = useRevalidator(); // when loaders invoked via mutations
  const numMutations = useIsMutating(); // when mutation invoked

  const isLoading = revalidatorState === 'loading'
    || navigationState === 'loading'
    || navigationState === 'submitting'
    || numMutations > 0;

  return isLoading ? <TopBarProgressComponent /> : null;
}

export {
  configureTopBarProgress,
  TopBarProgress,
};
