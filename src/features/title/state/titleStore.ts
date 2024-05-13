import { StateCreator } from 'zustand';
import { createStore, createHooks } from '@/utils/zustand/createStore';

type TitleStore = {
  title: string;
  titleActions: {
    setTitle: (title: string) => void;
  };
};

const titleStore: StateCreator<TitleStore> = (set) => ({
  title: '',
  titleActions: {
    setTitle: (title) => set(() => ({ title })),
  },
});

export const useTitleStore = createStore(
  titleStore,
  { devtoolsStoreName: 'title' },
);

export const { useTitle, useTitleActions } = createHooks(useTitleStore);
