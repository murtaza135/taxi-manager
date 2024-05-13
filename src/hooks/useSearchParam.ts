import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

type Primitive = string | number | boolean;

const NUMBER_REGEX = /^\d+(\.\d+)?$/g;
const TRUE_REGEX = /^true$/gi;
const FALSE_REGEX = /^false$/gi;

function convertString(str: string | null) {
  if (str === null) return null;
  if (str.match(NUMBER_REGEX)) return Number(str);
  if (str.match(TRUE_REGEX)) return true;
  if (str.match(FALSE_REGEX)) return false;
  return str;
}

export function useSearchParam<T extends Primitive>(param: string, initValue?: T) {
  const [params, setParams] = useSearchParams();

  // TODO unsafe typecasting - search param can be changed by user into a different type
  const paramValue = convertString(params.get(param)) as T | null;

  const setParamValue = useCallback((value: T) => {
    if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean') {
      throw new Error('Invalid data type of `value`');
    }

    setParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set(param, String(value));
      return newParams;
    });
  }, [param, setParams]);

  useEffect(() => {
    if (initValue !== undefined) {
      setParamValue(initValue);
    }
  }, [initValue, setParamValue]);

  return [paramValue, setParamValue] as const;
}
