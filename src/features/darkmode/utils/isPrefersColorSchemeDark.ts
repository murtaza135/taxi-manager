export function isPrefersColorSchemeDark() {
  if (typeof window === 'undefined') {
    throw new Error('Window object does not exist');
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}
