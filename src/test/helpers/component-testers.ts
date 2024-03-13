import { DebugElement, Predicate, Type } from '@angular/core'
import { ComponentFixture } from '@angular/core/testing'
import { makeHostComponent, testSetup } from './component-test-setup'
import { byComponent } from './component-query-predicates'

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
      byComponent(component),
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
 * Ensures the given component contains the child content passed to it
 *
 * @see https://stackoverflow.com/a/61724478/3263250
 */
export function ensureProjectsContent(
  component: Type<unknown>,
  projectionContainerPredicate?: Predicate<DebugElement>,
) {
  it(`should project its content`, () => {
    const contentToProject = '<b>Foo</b><i>bar</i>'
    const hostComponent = makeHostComponent(component, contentToProject)
    const [fixture] = testSetup(hostComponent)
    // No change detection triggered given nothing may have changed

    const componentElement = fixture.debugElement.query(byComponent(component))
    expect(componentElement).toBeTruthy()

    const projectionContainerElement = !projectionContainerPredicate
      ? componentElement
      : componentElement.query(projectionContainerPredicate)
    expect(projectionContainerElement).toBeTruthy()
    expect(projectionContainerElement.nativeElement.innerHTML.trim()).toEqual(
      contentToProject,
    )
  })
}
