import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Type } from '@angular/core'

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
export function componentTestSetup<T>(
  component: Type<T>,
  moduleDef: Parameters<TestBed['configureTestingModule']>[0] = {},
  componentOverrides?: Parameters<TestBed['overrideComponent']>[1],
): [ComponentFixture<T>, T] {
  TestBed.configureTestingModule(moduleDef)
  if (componentOverrides) {
    TestBed.overrideComponent(component, componentOverrides)
  }
  const fixture = TestBed.createComponent(component)
  return [fixture, fixture.componentInstance]
}
