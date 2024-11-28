import { Signal } from '@angular/core'

/**
 * Utility type to create a typed record of component inputs and their values.
 *
 * Takes into account inputs could be signals for the type to be correct anyway.
 *
 * Useful for:
 *  - {@link ChippedContent}
 *  - {@link setFixtureInputs}
 */
export type ComponentInputs<
  T extends object,
  K extends StringKeyOf<T> = StringKeyOf<T>,
> = Partial<Record<K, MaybeSignalType<T[K]>>>
type StringKeyOf<T> = Extract<keyof T, string>
type MaybeSignalType<T> = T extends Signal<infer R> ? R : T
