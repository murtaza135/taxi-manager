export type OptionalGroup<T> = { [P in keyof T]?: undefined } | Required<T>;
