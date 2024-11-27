import { Signal } from '@angular/core'
import { ComponentFixture } from '@angular/core/testing'

export const setFixtureInputs = <T extends object, K extends StringKeyOf<T>>(
  fixture: ComponentFixture<T>,
  inputs: Record<K, MaybeSignalType<T[K]>>,
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

type StringKeyOf<T> = Extract<keyof T, string>
type MaybeSignalType<T> = T extends Signal<infer R> ? R : T
