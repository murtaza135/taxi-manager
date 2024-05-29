/**
 * Make an object either required in its entirety or optional in its entirety.
 * i.e. either none of the properties from the object can be used, or all of
 * them must be used.
 */
export type OptionalObjectGroup<T> = { [P in keyof T]?: undefined } | Required<T>;
