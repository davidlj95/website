import {
  DebugElement,
  Predicate,
  reflectComponentType,
  Type,
} from '@angular/core'
import { isClass } from './types'
import { By } from '@angular/platform-browser'

/**
 * Creates a predicate to query for a debug element given the component type to look for
 *
 * So instead of
 * ```
 * const componentDebugElement = fixture.debugElement.query(By.css('app-foo'));
 * ```
 *
 * You can just
 *
 * ```
 * const componentDebugElement = fixture.debugElement.query(byComponent(FooComponent));
 * ```
 */
export function byComponent<C>(component: Type<C>): Predicate<DebugElement> {
  return By.css(getComponentSelector(component))
}

/**
 * Returns the component HTML tag name (selector) given its type
 *
 * Useful to identify a component without hard-coding the component's HTML tag
 *
 * @see byComponent for simple queries by component type
 *
 * So instead of
 * ```
 * const componentDebugElement = fixture.debugElement.query(
 *  By.css('app-foo.selected')
 * );
 * ```
 *
 * You can just
 *
 * ```
 * const componentDebugElement = fixture.debugElement.query(
 *  By.css(`${getComponentSelector(FooComponent)}.selected`)
 * );
 * ```
 */
export function getComponentSelector<C>(component: Type<C>) {
  if (!isClass(component)) {
    throw new Error('Component argument is not a class')
  }
  const selector = reflectComponentType(component)?.selector
  if (!selector) {
    throw new Error(
      `Selector not found for alleged component: ${component.constructor.name}`,
    )
  }
  return selector
}
