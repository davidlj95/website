import { ComponentFixture } from '@angular/core/testing'
import { ComponentInputs } from '@/common/component-inputs'

export const setFixtureInputs = <T extends object>(
  fixture: ComponentFixture<T>,
  inputs: ComponentInputs<T>,
) => {
  Object.entries(inputs).forEach(([name, value]) =>
    fixture.componentRef.setInput(name, value),
  )
}
export const setFixtureInputsAndDetectChanges: typeof setFixtureInputs = (
  fixture,
  ...args
) => {
  setFixtureInputs(fixture, ...args)
  fixture.detectChanges()
}
