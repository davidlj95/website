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
): [ComponentFixture<T>, T] {
  // 👇 Imports are usually for shallow-rendering components with `ng-mocks`
  //    After v19, need to override component imports, as they can't be
  //    declared in "root TestBed module" because everything is standalone now
  if (moduleDef.imports && moduleDef.imports.length > 0) {
    TestBed.overrideComponent(component, {
      set: { imports: moduleDef.imports },
    })
    delete moduleDef.imports
  }
  TestBed.configureTestingModule(moduleDef)
  const fixture = TestBed.createComponent(component)
  return [fixture, fixture.componentInstance]
}
