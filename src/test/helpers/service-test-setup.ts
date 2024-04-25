import { TestBed } from '@angular/core/testing'
import { InjectionToken, Type } from '@angular/core'

/**
 * Sets up a basic service test given the service to test
 *
 * @return the service instance
 *
 * So you can do:
 *
 * ```
 * const sut = serviceTestSetup(FooService)
 * ```
 */
export function serviceTestSetup<T>(
  service: Type<T> | InjectionToken<T>,
  moduleDef: Parameters<TestBed['configureTestingModule']>[0] = {},
): T {
  TestBed.configureTestingModule(moduleDef)
  return TestBed.inject(service)
}
