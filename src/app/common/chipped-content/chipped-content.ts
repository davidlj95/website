import { Type } from '@angular/core'
import { ComponentInputs } from '@/common/component-inputs'

export class ChippedContent<T extends object = object> {
  readonly displayName: string
  readonly component: Type<T>
  readonly inputs?: ComponentInputs<T>

  constructor({
    displayName,
    component,
    inputs,
  }: {
    displayName: string
    component: Type<T>
    inputs?: ComponentInputs<T>
  }) {
    this.displayName = displayName
    this.component = component
    this.inputs = inputs
  }
}
