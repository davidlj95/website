import { DebugElement } from '@angular/core'
import {
  DISPLAY_FLEX_IF_NO_SCRIPT_CLASS,
  VISIBILITY_HIDDEN_IF_NO_SCRIPT_CLASS,
} from '@common/no-script'

export function expectIsFlexDisplayedIfNoScript(debugElement: DebugElement) {
  expect(debugElement.classes[DISPLAY_FLEX_IF_NO_SCRIPT_CLASS]).toBeTrue()
}
export function expectIsVisibilityHiddenIfNoScript(debugElement: DebugElement) {
  expect(debugElement.classes[VISIBILITY_HIDDEN_IF_NO_SCRIPT_CLASS]).toBeTrue()
}
