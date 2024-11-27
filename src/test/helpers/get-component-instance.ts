import { DebugElement, Type } from '@angular/core'

export const getComponentInstance = <T extends object>(
  debugElement: DebugElement,
  component: Type<T>,
): T => {
  const componentInstance = debugElement.componentInstance as T
  if (!(componentInstance instanceof component)) {
    const expectedComponentName = component.name
    const actualComponentName = componentInstance.constructor.name
    throw new Error(
      `Unexpected component instance type. Expected: '${expectedComponentName}'. Actual: '${actualComponentName}'`,
    )
  }
  return componentInstance
}
