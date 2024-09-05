import { useCallback, useState } from 'react';
import { useDebounceValue as useDebounceValueUseHooksTS } from 'usehooks-ts';

export function useDebounceValue<S>(initialState: S | (() => S), delay: number = 500) {
  const [originalValue, setOriginalValue] = useState<S>(initialState);
  const [debounceValue, setDebounceValue] = useDebounceValueUseHooksTS<S>(initialState, delay);

  const setValue = useCallback((value: S) => {
    setOriginalValue(value);
    setDebounceValue(value);
  }, [setOriginalValue, setDebounceValue]);

  return [debounceValue, setValue, originalValue] as const;
}
