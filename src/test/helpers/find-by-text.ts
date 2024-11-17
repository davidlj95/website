import { DebugElement } from '@angular/core'

export const findByText = (
  debugElements: readonly DebugElement[],
  textMatcher: string,
): DebugElement | undefined =>
  debugElements.find(
    (debugElement) =>
      debugElement.nativeElement.textContent.trim() === textMatcher,
  )
