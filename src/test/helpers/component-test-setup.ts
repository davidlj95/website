import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Component, Type } from '@angular/core'
import { getComponentSelector } from './component-query-predicates'

/**
 * Sets up a basic component test given the component to test
 *
 * Returns the fixture and component (last one can be retrieved from fixture, but just for dx purposes)
 *
 * So you can do:
 *
 * ```
 * const [fixture, component] = componentTestSetup(FooComponent)
 * ```
 */
export function testSetup<T>(component: Type<T>): [ComponentFixture<T>, T] {
  TestBed.configureTestingModule({})
  const fixture = TestBed.createComponent(component)
  return [fixture, fixture.componentInstance]
}

/**
 * Sets up a basic component test with a host component and a child component. This is useful to test if content
 * projection (<ng-content>) is used.
 *
 * @see [ensureProjectsContent]
 *
 * Returns the fixture and component for the host component
 */
export function testSetupWithHostComponent<T>(
  hostComponent: Type<T>,
  childComponent: Type<unknown>,
): [ComponentFixture<T>, T] {
  TestBed.configureTestingModule({
    imports: [hostComponent, childComponent],
  })
  const fixture = TestBed.createComponent(hostComponent)
  return [fixture, fixture.componentInstance]
}

/**
 * Creates a host component including the given child component.
 *
 * Embeds inside that child component the given content.
 * Useful to check if a component includes child contents
 *
 * @see [ensureProjectsContent]
 *
 * Returns the host component type
 */
export function makeHostComponent(
  childComponent: Type<unknown>,
  innerHtml: string,
): Type<unknown> {
  const childComponentSelector = getComponentSelector(childComponent)
  // noinspection AngularMissingOrInvalidDeclarationInModule
  @Component({
    template: `<${childComponentSelector}>${innerHtml}</${childComponentSelector}>`,
  })
  class TestHostComponent {}
  return TestHostComponent
}
