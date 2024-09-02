type Options = {
  preserveCase?: boolean;
};

export function extname(path: string, options?: Options) {
  const pathSplit = path.split('.');
  const ext = `.${pathSplit[pathSplit.length - 1]}`;
  return options?.preserveCase ? ext : ext.toLowerCase();
}
