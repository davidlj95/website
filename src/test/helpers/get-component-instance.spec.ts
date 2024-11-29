import { Component } from '@angular/core'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { getComponentInstance } from '@/test/helpers/get-component-instance'

@Component({
  selector: 'app-test-component',
  template: '',
})
export class TestComponent {}
@Component({
  selector: 'app-another-test-component',
  template: '',
})
export class AnotherTestComponent {}

describe('GetComponentInstance', () => {
  describe('when component instance matches component type', () => {
    it('should return component instance (with type assertion)', () => {
      const [fixture, component] = componentTestSetup(TestComponent)

      expect(getComponentInstance(fixture.debugElement, TestComponent)).toBe(
        component,
      )
    })
  })

  describe('when component instance does match component type', () => {
    it('should throw an informative error', () => {
      const [fixture] = componentTestSetup(TestComponent)

      let error: Error | undefined
      try {
        getComponentInstance(fixture.debugElement, AnotherTestComponent)
      } catch (caughtError: unknown) {
        error = caughtError as Error
      }

      expect(error).toBeDefined()
      expect(error?.message).toMatch(/unexpected component instance type/i)
      expect(error?.message)
        .withContext('should indicate expected type')
        .toMatch(/E|expected[\s:'"]+EmptyComponent/)

      expect(error?.message)
        .withContext('should indicate actual type')
        .toMatch(/A|actual[\s:'"]+TestComponent/)
    })
  })
})
