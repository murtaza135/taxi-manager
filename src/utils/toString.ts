export function toString(value: unknown, defaultValue?: string) {
  if (typeof value === 'string') return value;
  if (typeof defaultValue === 'string') return defaultValue;
  return String(value);
}
