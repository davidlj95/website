import { By } from '@angular/platform-browser'
import { MATERIAL_SYMBOLS_CLASS } from '@/common/material-symbol.directive'
import { DebugElement } from '@angular/core'
import { textContent } from '@/test/helpers/text-content'

export const MATERIAL_SYMBOLS_SELECTOR = By.css(`.${MATERIAL_SYMBOLS_CLASS}`)
export const findMaterialSymbolByText = (
  debugElement: DebugElement,
  text: string,
) => {
  const icon = debugElement
    .queryAll(MATERIAL_SYMBOLS_SELECTOR)
    .find((debugElement) => textContent(debugElement) == text)
  expect(icon)
    .withContext(
      `icon with unicode escape \\u${text.charCodeAt(0).toString(16)} exists`,
    )
    .not.toBeUndefined()
  return icon!
}
