import { create, StoreApi, UseBoundStore, StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { config } from '@/app/config';
import { capitalise } from '@/util/capitalise';

type PersistOptions =
  | { persist: true; persistKey: string; }
  | { persist?: false; persistKey?: string; };

export type CreateStoreOptions = PersistOptions & {
  devtoolsStoreName: string;
};

export function createStore<S extends object>(slice: StateCreator<S>, options: CreateStoreOptions) {
  const useStore = (function createStoreWithPersist() {
    if (options.persist) {
      return create<S>()(
        persist(
          (...a) => ({ ...slice(...a) }),
          { name: options.persistKey },
        ),
      );
    }

    return create<S>()(slice);
  }());

  if (!config.PROD) {
    mountStoreDevtool(options.devtoolsStoreName, useStore);
  }

  return useStore;
}

type Hooks<S> = (
  S extends { getState: () => infer T; }
    ? { hooks: { [K in keyof T as `use${Capitalize<string & K>}`]: () => T[K] }; }
    : never
)['hooks'];

export const createHooks = <S extends UseBoundStore<StoreApi<object>>>(store: S) => {
  const hooks: Hooks<typeof store> = Object.keys(store.getState())
    .reduce((obj, newKey) => ({
      ...obj,
      [`use${capitalise(newKey)}`]: () => store((s) => s[newKey as keyof typeof s]),
    }), {});

  return hooks;
};
