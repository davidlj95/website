import { DebugElement, Type } from '@angular/core'

export const getComponentInstance = <T>(
  debugElement: DebugElement,
  component: Type<T>,
): T => {
  const componentInstance = debugElement.componentInstance as Type<unknown>
  if (!(componentInstance instanceof component)) {
    const expectedComponentName = component.name
    const actualComponentName = componentInstance.constructor.name
    throw new Error(
      `Unexpected component instance type. Expected: '${expectedComponentName}'. Actual: '${actualComponentName}'`,
    )
  }
  return componentInstance
}
