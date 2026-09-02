export type Prettify<T> = { [K in keyof T]: T[K] } & {};

export type UnionToIntersection<T> = Prettify<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (T extends any ? (x: T) => any : never) extends (x: infer R) => any
    ? R
    : never
>;
