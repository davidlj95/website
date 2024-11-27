import { Type } from '@angular/core'

export class ChippedContent<T = unknown> {
  readonly displayName: string
  readonly component: Type<T>
  readonly inputs?: Partial<T>

  constructor({
    displayName,
    component,
    inputs,
  }: {
    displayName: string
    component: Type<T>
    inputs?: Partial<T>
  }) {
    this.displayName = displayName
    this.component = component
    this.inputs = inputs
  }
}
