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
  // allow either defaultValue or controlledValue
  // if defaultValue, then component is uncontrolled
  // if controlledValue, then component is controlled
  if (!xor(defaultValue, controlledValue)) {
    throw new Error(
      'useControlledState requires either a controlled `value` or a `defaultValue`',
    );
  }

  // keep track of internal state for uncontrolled components
  // and let the consumer of useControlledState keep track
  // of the external state for controlled components
  const [internalState, setInternalState] = useState<S | undefined>(defaultValue);

  // update both the internal and external state in setState function
  const setState = useCallback(
    (value: SetStateAction<S>) => {
      setInternalState(value as SetStateAction<S | undefined>);
      onValueChange?.(value);
    },
    [setInternalState, onValueChange],
  ) as Dispatch<SetStateAction<S>>;

  // return controlledValue if component is controlled,
  // otherwise return internalState if component is uncontrolled
  const isControlled = typeof controlledValue !== 'undefined';
  const state = isControlled ? controlledValue as S : internalState as S;

  return [state, setState] as const;
}
