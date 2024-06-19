import { DebugElement } from '@angular/core'

export const findByText = (
  debugElements: ReadonlyArray<DebugElement>,
  textMatcher: string,
): DebugElement | undefined =>
  debugElements.find(
    (debugElement) =>
      debugElement.nativeElement.textContent.trim() === textMatcher,
  )
