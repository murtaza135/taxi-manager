type Options = {
  preserveCase?: boolean;
};

export function extname(path: string, options?: Options) {
  const ext = `.${path.split('.').at(-1)}`;
  return options?.preserveCase ? ext : ext.toLowerCase();
}
