export function xor(value1: unknown, value2: unknown) {
  return (!!value1 && !value2) || (!value1 && !!value2);
}
