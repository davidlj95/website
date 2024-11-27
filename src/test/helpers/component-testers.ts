import { Component, DebugElement, Predicate, Type } from '@angular/core'
import { ComponentFixture } from '@angular/core/testing'
import { componentTestSetup } from './component-test-setup'
import { byComponent, getComponentSelector } from './component-query-predicates'
import { innerHtml } from '@/test/helpers/inner-html'

/**
 * Tests a component is contained inside the provided fixture
 */
export function shouldContainComponent<T, U>(
  fixtureGetter: () => ComponentFixture<T>,
  component: Type<U>,
  givenName: string | undefined = undefined,
) {
  const name =
    givenName ??
    component.name
      .replace(/([A-Z])/g, ' $1')
      .slice(1)
      .toLowerCase()
  it(`should contain ${name}`, () => {
    const debugElement = fixtureGetter().debugElement.query(
      byComponent(component),
    )
    expect(debugElement).toBeTruthy()
  })
}

/**
 * Tests a component is contained inside the provided fixture
 *
 * {@link shouldContainComponent}
 */
export function shouldContainComponents<T>(
  fixtureGetter: () => ComponentFixture<T>,
  ...components: Type<unknown>[]
) {
  for (const component of components) {
    shouldContainComponent(fixtureGetter, component)
  }
}

/**
 * Tests given component projects content
 *
 * @see {@link https://stackoverflow.com/a/61724478/3263250}
 * @param component - Component that should project content
 * @param projectionContainerPredicate - Predicate to locate the component's element that projects the content
 *                                       Defaults to the component itself. This way, it doesn't matter where it's
 *                                       projected as long content gets projected.
 */
export function shouldProjectContent(
  component: Type<unknown>,
  projectionContainerPredicate?: Predicate<DebugElement>,
) {
  it(`should project its content`, () => {
    // TODO: this could be random to ensure component doesn't include that HTML by mistake
    const contentToProject = '<b>Foo</b><i>bar</i>42'
    const componentSelector = getComponentSelector(component)
    @Component({
      template: `<${componentSelector}>${contentToProject}</${componentSelector}>`,
      imports: [component],
    })
    class HostComponent {}
    const [fixture] = componentTestSetup(HostComponent)
    // No change detection triggered given nothing may have changed

    // Ensure component is there
    const componentElement = fixture.debugElement.query(byComponent(component))
    expect(componentElement).toBeTruthy()

    // Ensure projected content is there
    const projectionContainerElement = !projectionContainerPredicate
      ? componentElement
      : componentElement.query(projectionContainerPredicate)
    expect(projectionContainerElement).toBeTruthy()
    expect(innerHtml(projectionContainerElement)).toEqual(contentToProject)
  })
}
