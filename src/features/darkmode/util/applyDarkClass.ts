export function applyDarkClass(apply: boolean) {
  if (typeof window === 'undefined') {
    throw new Error('Window object does not exist');
  }

  if (apply) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}
