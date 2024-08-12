import { useState, useCallback } from 'react';

type UseMaxInitialState = number | (() => number);
type UseMaxReturnType = [number, (value: number) => void];

export function useMax(initialState: UseMaxInitialState): UseMaxReturnType {
  const [maxValue, setMaxValue] = useState<number>(initialState);

  const setMax = useCallback((value: number) => {
    setMaxValue((prev) => Math.max(prev, value));
  }, []);

  return [maxValue, setMax] as const;
}
