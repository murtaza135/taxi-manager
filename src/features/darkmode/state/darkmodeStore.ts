import { StateCreator } from 'zustand';
import { applyDarkClass } from '@/features/darkmode/utils/applyDarkClass';
import { isPrefersColorSchemeDark } from '@/features/darkmode/utils/isPrefersColorSchemeDark';
import { createStore, createHooks } from '@/lib/zustand/createStore';

type DarkmodeStore = {
  isDarkmode: boolean;
  darkmodeActions: {
    enableDarkmode: () => void;
    disableDarkmode: () => void;
    toggleDarkmode: () => void;
  };
};

const darkmodeStore: StateCreator<DarkmodeStore> = (set, get) => ({
  isDarkmode: isPrefersColorSchemeDark(),
  darkmodeActions: {
    enableDarkmode() {
      set(() => ({ isDarkmode: true }));
      applyDarkClass(true);
    },
    disableDarkmode() {
      set(() => ({ isDarkmode: true }));
      applyDarkClass(false);
    },
    toggleDarkmode() {
      set((state) => ({ isDarkmode: !state.isDarkmode }));
      const { isDarkmode } = get();
      applyDarkClass(isDarkmode);
    },
  },
});

export const useDarkmodeStore = createStore(darkmodeStore, {
  devtoolsStoreName: 'darkmode',
  persist: true,
  persistKey: 'darkmode',
  partialize: ({ darkmodeActions, ...rest }) => rest,
});

export const { useIsDarkmode, useDarkmodeActions } = createHooks(useDarkmodeStore);
