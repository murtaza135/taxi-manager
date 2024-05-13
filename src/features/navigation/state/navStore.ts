import { StateCreator } from 'zustand';
import { createStore, createHooks } from '@/utils/zustand/createStore';

type NavStore = {
  isNavOpen: boolean;
  navActions: {
    openNav: () => void;
    closeNav: () => void;
    toggleNav: () => void;
  };
};

const navStore: StateCreator<NavStore> = (set) => ({
  isNavOpen: false,
  navActions: {
    openNav: () => set(() => ({ isNavOpen: true })),
    closeNav: () => set(() => ({ isNavOpen: false })),
    toggleNav: () => set((state) => ({ isNavOpen: !state.isNavOpen })),
  },
});

export const useNavStore = createStore(navStore, { devtoolsStoreName: 'nav' });

export const { useIsNavOpen, useNavActions } = createHooks(useNavStore);
