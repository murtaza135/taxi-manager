import { useState, useCallback, Dispatch, SetStateAction } from 'react';

type UseControlledStateOptions<S> = {
  value: S;
  onValueChange: Dispatch<SetStateAction<S>>;
  defaultValue?: S | (() => S);
} | {
  value?: undefined;
  onValueChange?: Dispatch<SetStateAction<S>>;
  defaultValue: S | (() => S);
};

export function useControlledState<S>(
  { defaultValue, value: controlledValue, onValueChange }: UseControlledStateOptions<S>,
) {
  if (controlledValue !== undefined && onValueChange === undefined) {
    throw new Error(
      'useControlledState requires a corresponding `onValueChange` callback alongside the `value` prop',
    );
  }

  // keep track of internal state for uncontrolled components,
  // initially allow undefined
  const [internalState, setInternalState] = useState<S | undefined>(
    controlledValue !== undefined ? controlledValue : defaultValue,
  );

  // return controlledValue if component is controlled,
  // otherwise return internalState if component is uncontrolled,
  // this will ensure that state is always of type S, and is no longer undefined
  const state: S = (function getState() {
    if (controlledValue !== undefined) {
      return controlledValue;
    } if (defaultValue !== undefined && internalState !== undefined) {
      return internalState;
    }

    throw new Error(
      'useControlledState requires either a controlled `value` or a `defaultValue`',
    );
  }());

  // update both the internal and external state,
  // since state will always be of type S (as defined above),
  // setState should always only accept an argument of type S
  const setState = useCallback(
    (value: SetStateAction<S>) => {
      setInternalState(value as SetStateAction<S | undefined>);
      onValueChange?.(value);
    },
    [setInternalState, onValueChange],
  ) as Dispatch<SetStateAction<S>>;

  return [state, setState] as const;
}
