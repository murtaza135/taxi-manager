export function extname(path: string) {
  const pathSplit = path.split('.');
  const ext = `.${pathSplit[pathSplit.length - 1]}`;
  return ext;
}
