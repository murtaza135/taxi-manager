import { StateCreator } from 'zustand';
import { createStore, createHooks } from '@/util/createStore';

type TitleStore = {
  title: string;
  setTitle: (title: string) => void;
};

const titleStore: StateCreator<TitleStore> = (set) => ({
  title: '',
  setTitle: (title) => set(() => ({ title })),
});

export const useTitleStore = createStore(
  titleStore,
  { devtoolsStoreName: 'title' },
);

export const titleHooks = createHooks(useTitleStore);
