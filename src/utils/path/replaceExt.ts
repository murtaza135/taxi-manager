export function replaceExt(path: string, ext: string) {
  const pathWithoutExt = path.split('.').slice(0, -1).join('.');
  const newExt = ext.startsWith('.') ? ext : `.${ext}`;
  return `${pathWithoutExt}${newExt}`;
}
