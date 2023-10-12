import { reflectComponentType, Type } from '@angular/core'
import { ComponentFixture } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { isClass } from './types'
import {
  makeHostComponent,
  testSetupWithHostComponent,
} from './component-test-setup'

const COMPONENT_CLASS_SUFFIX = 'Component'

/**
 * Writes a test to ensure the component fixture contains the given component
 */
export function ensureHasComponent<T, U>(
  fixtureGetter: () => ComponentFixture<T>,
  component: Type<U>,
  givenName: string | undefined = undefined,
) {
  const name =
    givenName ??
    component.name
      .replace(COMPONENT_CLASS_SUFFIX, '')
      .replace(/([A-Z])/g, ' $1')
      .slice(1)
      .toLowerCase()
  it(`should render the ${name}`, () => {
    const debugElement = fixtureGetter().debugElement.query(
      By.css(getComponentSelector(component)),
    )
    expect(debugElement).toBeTruthy()
  })
}

/**
 * Writes a test to ensure the component fixture contains the given components
 *
 * @see ensureHasComponent
 */
export function ensureHasComponents<T>(
  fixtureGetter: () => ComponentFixture<T>,
  ...components: Array<Type<unknown>>
) {
  for (const component of components) {
    ensureHasComponent(fixtureGetter, component)
  }
}

/**
 * Useful to identify a component without hard-coding the component's HTML tag
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

/**
 * Ensures the given component contains the child content passed to it
 *
 * @see https://stackoverflow.com/a/61724478/3263250
 */
export function ensureProjectsContent(component: Type<unknown>) {
  it(`should project its content`, () => {
    const contentToProject = '<b>Foo</b><i>bar</i>'
    const hostComponent = makeHostComponent(component, contentToProject)
    const [fixture] = testSetupWithHostComponent(hostComponent, component)
    // No change detection triggered given nothing may have changed

    const componentElement = fixture.debugElement.query(
      By.css(getComponentSelector(component)),
    )
    expect(componentElement).toBeTruthy()
    expect(componentElement.nativeElement.innerHTML.trim()).toEqual(
      contentToProject,
    )
  })
}
