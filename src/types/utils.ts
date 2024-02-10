export type OptionalObject<T> = { [P in keyof T]?: undefined } | Required<T>;
