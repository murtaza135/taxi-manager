export function stringToBool(str: string) {
  if (str === 'true') return true;
  if (str === 'false') return false;
  throw new Error(`Could not convert '${str}' to bool`);
}
