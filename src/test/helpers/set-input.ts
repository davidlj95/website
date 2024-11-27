import { ComponentRef, Signal } from '@angular/core'
import { ComponentFixture } from '@angular/core/testing'

export const setInput = <T extends object, K extends StringKeyOf<T>>(
  componentRef: ComponentRef<T>,
  name: K,
  value: MaybeSignalType<T[K]>,
) => componentRef.setInput(name, value)

type StringKeyOf<T> = Extract<keyof T, string>
type MaybeSignalType<T> = T extends Signal<infer R> ? R : T

export const setFixtureInput = <T extends object, K extends StringKeyOf<T>>(
  fixture: ComponentFixture<T>,
  name: K,
  value: MaybeSignalType<T[K]>,
  opts: SetFixtureInputOptions = {},
) => {
  setInput(fixture.componentRef, name, value)
  if (!opts.noChangeDetection) {
    fixture.detectChanges()
  }
}
type SetFixtureInputOptions = Partial<{ noChangeDetection: boolean }>

export const setInputs = <T extends object, K extends StringKeyOf<T>>(
  componentRef: ComponentRef<T>,
  inputs: Record<K, MaybeSignalType<T[K]>>,
) =>
  Object.entries(inputs).forEach(([name, value]) =>
    componentRef.setInput(name, value),
  )

export const setFixtureInputs = <T extends object, K extends StringKeyOf<T>>(
  fixture: ComponentFixture<T>,
  inputs: Record<K, MaybeSignalType<T[K]>>,
  opts: SetFixtureInputOptions = {},
) => {
  setInputs(fixture.componentRef, inputs)
  if (!opts.noChangeDetection) {
    fixture.detectChanges()
  }
}
