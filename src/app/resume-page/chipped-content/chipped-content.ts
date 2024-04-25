import { Type } from '@angular/core'

export class ChippedContent<T = unknown> {
  public readonly displayName: string
  public readonly component: Type<T>
  public readonly inputs?: Partial<T>

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
