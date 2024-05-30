type Options = {
  minLength?: number;
  requireLowercase?: boolean;
  requireUppercase?: boolean;
  requireNumber?: boolean;
};

const defaultOptions: Options = {
  minLength: 8,
  requireLowercase: true,
  requireUppercase: true,
  requireNumber: true,
};

export function isStrongPassword(str: string, options?: Options) {
  const {
    minLength = 8,
    requireLowercase,
    requireUppercase,
    requireNumber,
  } = options ?? defaultOptions;

  const trimmedStr = str.trim();

  if (trimmedStr.length < minLength) return false;
  if (requireLowercase && !trimmedStr.match(/.*[a-z]+.*/)) return false;
  if (requireUppercase && !trimmedStr.match(/.*[A-Z]+.*/)) return false;
  if (requireNumber && !trimmedStr.match(/.*[0-9]+.*/)) return false;

  return true;
}
