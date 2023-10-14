import { Type } from '@angular/core'

export class ChippedContent<T, U> {
  public readonly id: T
  public readonly displayName: string
  public readonly component: Type<U>
  public readonly setupComponent: (component: U) => void

  constructor({
    id,
    displayName,
    component,
    setupComponent,
  }: {
    id: T
    displayName: string
    component: Type<U>
    setupComponent: (component: U) => void
  }) {
    this.id = id
    this.displayName = displayName
    this.component = component
    this.setupComponent = setupComponent
  }
}
