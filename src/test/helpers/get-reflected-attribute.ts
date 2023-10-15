import { DebugElement } from '@angular/core'

export function getReflectedAttribute(
  element: DebugElement,
  name: string,
): string | null {
  return element.attributes[`ng-reflect-${name}`]
}
