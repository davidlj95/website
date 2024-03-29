import { Type } from '@angular/core'

export class ChippedContent {
  public readonly displayName: string
  public readonly component: Type<unknown>
  public readonly inputs?: Record<string, unknown>

  constructor({
    displayName,
    component,
    inputs,
  }: {
    displayName: string
    component: Type<unknown>
    inputs?: Record<string, unknown>
  }) {
    this.displayName = displayName
    this.component = component
    this.inputs = inputs
  }
}
