import { Component, DebugElement, Predicate, Type } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { componentTestSetup } from './component-test-setup'
import { innerHtml } from '@/test/helpers/inner-html'
import { By } from '@angular/platform-browser'

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
    const componentSelector = 'component-under-test'
    const template = `<${componentSelector}>${contentToProject}</${componentSelector}>`
    @Component({
      template,
      imports: [component],
    })
    class HostComponent {}
    TestBed.overrideComponent(component, {
      set: { selector: componentSelector },
    })
    const [fixture] = componentTestSetup(HostComponent)
    // No change detection triggered given nothing may have changed

    // Ensure the component is there
    const componentElement = fixture.debugElement.query(By.directive(component))
    expect(componentElement).toBeTruthy()

    // Ensure projected content is there
    const projectionContainerElement = !projectionContainerPredicate
      ? componentElement
      : componentElement.query(projectionContainerPredicate)
    expect(projectionContainerElement).toBeTruthy()
    expect(innerHtml(projectionContainerElement)).toEqual(contentToProject)
  })
}
