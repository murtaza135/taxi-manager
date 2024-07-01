/**
 * Make an object either required in its entirety or optional in its entirety.
 * i.e. either none of the properties from the object can be used, or all of
 * them must be used.
 */
export type OptionalObjectGroup<T> = { [P in keyof T]?: undefined } | Required<T>;

/**
 * Replace a key K mapping to a value of type T with a value of type R
 */
export type Replace<T, K extends keyof T, R> = Omit<T, K> & { [P in K]: R };

/**
 * @source https://github.com/ts-essentials/ts-essentials/tree/1d2cca406eafb1ab3395ac58cb1c5a9a7e6588d0/lib/prettify
 * Flattens type and makes it more readable on hover in your IDE
 */
export type Prettify<T> = {
  [K in keyof T]: T[K];
  // eslint-disable-next-line @typescript-eslint/ban-types
} & {};
