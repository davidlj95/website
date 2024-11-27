/**
 * Useful to ensure something is a reference to a `class`
 *
 * @see https://stackoverflow.com/a/43197340/3263250
 */
export function isClass(klass: new () => unknown) {
  const isCtorClass = klass.constructor?.toString().startsWith('class')
  if (klass.prototype === undefined) {
    return isCtorClass
  }
  const isPrototypeCtorClass = (klass.prototype as MaybeObject).constructor
    ?.toString()
    .startsWith('class')
  return isCtorClass || isPrototypeCtorClass
}

// eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
type MaybeObject = Partial<Pick<Object, 'constructor'>>
