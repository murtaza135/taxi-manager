import { create, StoreApi, UseBoundStore, StateCreator, Mutate } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { config } from '@/config/config';
import { capitalize } from '@/utils/string/capitalize';

type PersistOptions<S> =
  | { persist: true; persistKey: string; partialize?: (state: S) => unknown; }
  | { persist?: false; persistKey?: string; partialize?: (state: S) => unknown; };

export type CreateStoreOptions<S> = PersistOptions<S> & {
  devtoolsStoreName: string;
};

export type UseMutatedBoundStore<S> = UseBoundStore<
  Mutate<
    StoreApi<S>,
    [
      ['zustand/subscribeWithSelector', never],
    ]
  >
>;

// Create a zustand store with predefined middleware and devtools
export function createStore<S extends object>(
  stateObject: StateCreator<S>,
  options: CreateStoreOptions<S>,
): UseMutatedBoundStore<S> {
  const useStore = (function createStoreWithPersist() {
    // apply persist middleware, which persists state to localStorage,
    // requires a localStorage key (persistKey), and an optional partialize function,
    // see https://docs.pmnd.rs/zustand/integrations/persisting-store-data for more details
    if (options.persist) {
      return create<S>()(
        subscribeWithSelector(
          persist(
            (...a) => ({ ...stateObject(...a) }),
            options.partialize
              ? { name: options.persistKey, partialize: options.partialize }
              : { name: options.persistKey },
          ),
        ),
      );
    }

    return create<S>()(stateObject) as UseMutatedBoundStore<S>;
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

// generate hooks for all top-level keys in the store, nested keys are NOT included,
// e.g. { someState: "someState", someAction: someFunc } will generate the follwong hooks:
// { useSomeState, useSomeAction }
export const createHooks = <S extends UseBoundStore<StoreApi<object>>>(store: S) => {
  const hooks: Hooks<typeof store> = Object.keys(store.getState())
    .reduce((obj, key) => ({
      ...obj,
      [`use${capitalize(key)}`]: () => store((s) => s[key as keyof typeof s]),
    }), {});

  return hooks;
};
