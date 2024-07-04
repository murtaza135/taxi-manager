import { useCallback, useState } from 'react';

export function useTimedBoolean(ms: number) {
  const [value, setValue] = useState<boolean>(false);

  const setBool = useCallback(() => {
    setValue(true);
    setTimeout(() => {
      setValue(false);
    }, ms);
  }, [ms]);

  return [value, setBool] as const;
}
