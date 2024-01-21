import { StateCreator } from 'zustand';
import { createStore, createHooks } from '@/util/createStore';
import { applyDarkClass } from '../util/applyDarkClass';

type DarkmodeStore = {
  isDarkmode: boolean;
  enable: () => void;
  disable: () => void;
  toggle: () => void;
};

const darkmodeStore: StateCreator<DarkmodeStore> = (set, get) => ({
  isDarkmode: false,
  enable() {
    set(() => ({ isDarkmode: true }));
    applyDarkClass(true);
  },
  disable() {
    set(() => ({ isDarkmode: true }));
    applyDarkClass(false);
  },
  toggle() {
    set((state) => ({ isDarkmode: !state.isDarkmode }));
    const { isDarkmode } = get();
    applyDarkClass(isDarkmode);
  },
});

export const useDarkmodeStore = createStore(
  darkmodeStore,
  { devtoolsStoreName: 'darkmode', persist: true, persistKey: 'darkmode' },
);

export const darkmodeHooks = createHooks(useDarkmodeStore);
