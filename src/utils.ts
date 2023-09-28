/**
 * Typescript type guard helper to generate type guard for enums
 *
 * @see https://stackoverflow.com/questions/58278652/generic-enum-type-guard#comment130450749_58278753
 * @param e Enum to create a type guard for
 */
/* istanbul ignore next */
export const isSomeEnum =
  <T extends { [s: string]: unknown }>(e: T) =>
  (token: unknown): token is T[keyof T] =>
    Object.values(e).includes(token as T[keyof T])
