import TopBarProgressComponent from 'react-topbar-progress-indicator';
import { useNavigation, useRevalidator } from 'react-router-dom';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { config } from '@/config/config';

function configureTopBarProgress(isDarkmode: boolean) {
  TopBarProgressComponent.config({
    barColors: {
      0: isDarkmode ? config.colors.primary.light : config.colors.primary.dark,
      '1.0': isDarkmode ? config.colors.primary.light : config.colors.primary.dark,
    },
    barThickness: 4,
    shadowBlur: 2,
  });
}

function TopBarProgress() {
  const { state: navigationState } = useNavigation(); // when data fetching occurs via loaders
  const { state: revalidatorState } = useRevalidator(); // when router cache needs to be revalidated AFTER mutation
  const numFetches = useIsFetching(); // when query invoked
  const numMutations = useIsMutating(); // when mutation invoked

  const isLoading = revalidatorState === 'loading'
    || navigationState === 'loading'
    || navigationState === 'submitting'
    || numFetches > 0
    || numMutations > 0;

  return isLoading ? <TopBarProgressComponent /> : null;
}

export {
  configureTopBarProgress,
  TopBarProgress,
};
