import { StateCreator } from 'zustand';
import { createStore, createHooks } from '@/util/createStore';

type NavStore = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const navStore: StateCreator<NavStore> = (set) => ({
  isOpen: false,
  open: () => set(() => ({ isOpen: true })),
  close: () => set(() => ({ isOpen: false })),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
});

export const useNavStore = createStore(
  navStore,
  { devtoolsStoreName: 'nav' },
);

export const navHooks = createHooks(useNavStore);
