/* eslint-disable @typescript-eslint/indent */
import { useState, useCallback, Dispatch, SetStateAction } from 'react';
import { type XOR } from 'ts-essentials';
import { xor } from '@/utils/xor';

type UseControlledStateOptions<S> =
  XOR<
    { defaultValue: S | (() => S); },
    { value: S; }
  >
  & { onValueChange?: Dispatch<SetStateAction<S>>; };

export function useControlledState<S>(
  { defaultValue, value: controlledValue, onValueChange }: UseControlledStateOptions<S>,
) {
  if (!xor(defaultValue, controlledValue)) {
    throw new Error('useControlledState requires either a controlled `value` or a `defaultValue`');
  }

  const [internalState, setInternalState] = useState<S | undefined>(defaultValue);

  const setState = useCallback(
    (value: SetStateAction<S>) => {
      setInternalState(value as SetStateAction<S | undefined>);
      onValueChange?.(value);
    },
    [setInternalState, onValueChange],
  ) as Dispatch<SetStateAction<S>>;

  const isControlled = typeof controlledValue !== 'undefined';
  const state = isControlled ? controlledValue as S : internalState as S;

  return [state, setState] as const;
}
