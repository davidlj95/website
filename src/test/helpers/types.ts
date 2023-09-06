/**
 * Useful to ensure something is a reference to a `class`
 *
 * @see https://stackoverflow.com/a/43197340/3263250
 */
export function isClass(klass: { new(): unknown }) {
  const isCtorClass = klass.constructor
    && klass.constructor.toString().substring(0, 5) === 'class'
  if (klass.prototype === undefined) {
    return isCtorClass
  }
  const isPrototypeCtorClass = klass.prototype.constructor
    && klass.prototype.constructor.toString
    && klass.prototype.constructor.toString().substring(0, 5) === 'class'
  return isCtorClass || isPrototypeCtorClass
}


