import { reflectComponentType, Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By, SafeValue } from '@angular/platform-browser';

const COMPONENT_CLASS_SUFFIX = 'Component';

/**
 * Writes a test to ensure the component fixture contains the given component
 */
export function ensureHasComponent<T, U>(fixtureGetter: () => ComponentFixture<T>, component: Type<U>, givenName: string | undefined = undefined) {
  const name = givenName ?? component.name
    .replace(COMPONENT_CLASS_SUFFIX, '')
    .replace(/([A-Z])/g, " $1")
    .slice(1)
    .toLowerCase();
  it(`should render the ${name}`, () => {
    const debugElement = fixtureGetter().debugElement.query(By.css(getComponentSelector(component)));
    expect(debugElement).toBeTruthy();
  });
}


/**
 * Writes a test to ensure the component fixture contains the given components
 *
 * @see ensureHasComponent
 */
export function ensureHasComponents<T>(fixtureGetter: () => ComponentFixture<T>, ...components: Array<Type<any>>) {
  for (const component of components) {
    ensureHasComponent(fixtureGetter, component);
  }
}

/**
 * Useful to identify a component without hardcoding the component's HTML tag
 *
 * So instead of
 * ```
 * const componentDebugElement = fixture.debugElement.query(By.css('app-foo'));
 * ```
 *
 * You can just
 *
 * ```
 * const componentDebugElement = fixture.debugElement.query(By.css(getComponentSelector(FooComponent)));
 * ```
 */
export function getComponentSelector<C>(component: Type<C>) {
  if (!isClass(component)) {
    throw new Error("Component argument is not a class")
  }
  const selector = reflectComponentType(component)?.selector;
  if (!selector) {
    throw new Error(`Selector not found for alleged component: ${component.constructor.name}`);
  }
  return selector;
}

/**
 * Useful to ensure something is a reference to a `class`
 *
 * @see https://stackoverflow.com/a/43197340/3263250
 */
function isClass(klass: any) {
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

/**
 * Useful to check for contents wrapped inside a SafeValue (SafeHtml, SafeScript, ...) as result of a DOM security
 * bypass
 *
 * @see https://github.com/angular/angular/blob/16.2.0/packages/core/src/sanitization/bypass.ts#L63
 */
export function getSafeValueContent(safeValue: SafeValue): string {
  // @ts-ignore
  return safeValue.changingThisBreaksApplicationSecurity;
}
