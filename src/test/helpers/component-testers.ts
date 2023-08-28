import { reflectComponentType, Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { isClass } from './types';

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
