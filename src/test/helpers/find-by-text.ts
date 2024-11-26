import { DebugElement } from '@angular/core'
import { textContent } from '@/test/helpers/text-content'

export const findByText = (
  debugElements: readonly DebugElement[],
  textMatcher: string,
): DebugElement | undefined =>
  debugElements.find(
    (debugElement) => textContent(debugElement) === textMatcher,
  )
