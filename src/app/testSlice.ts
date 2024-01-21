import { StateCreator } from 'zustand';
import { createStore, createHooks } from '@/util/createStore';

type TestSlice = {
  test: number;
  setTest: (value: number) => void;
};

const testSlice: StateCreator<TestSlice> = (set) => ({
  test: 0,
  setTest: (value) => set({ test: value }),
});

export const useTestStore = createStore(
  testSlice,
  { devtoolsStoreName: 'test' },
);

export const { useTest, useSetTest } = createHooks(useTestStore);
