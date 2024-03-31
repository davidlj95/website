import { DebugElement } from '@angular/core'
import {
  DISPLAY_BLOCK_IF_NO_SCRIPT_CLASS,
  DISPLAY_FLEX_IF_NO_SCRIPT_CLASS,
  DISPLAY_NONE_IF_NO_SCRIPT_CLASS,
  VISIBILITY_HIDDEN_IF_NO_SCRIPT_CLASS,
} from '@common/no-script'

export function expectIsFlexDisplayedIfNoScript(debugElement: DebugElement) {
  expect(debugElement.classes[DISPLAY_FLEX_IF_NO_SCRIPT_CLASS])
    .withContext('has display flex if no script')
    .toBeTrue()
}
export function expectIsBlockDisplayedIfNoScript(debugElement: DebugElement) {
  expect(debugElement.classes[DISPLAY_BLOCK_IF_NO_SCRIPT_CLASS])
    .withContext('has display block if no script')
    .toBeTrue()
}
export function expectIsNotDisplayedIfNoScript(debugElement: DebugElement) {
  expect(debugElement.classes[DISPLAY_NONE_IF_NO_SCRIPT_CLASS])
    .withContext('has display none if no script')
    .toBeTrue()
}
export function expectIsVisibilityHiddenIfNoScript(debugElement: DebugElement) {
  expect(debugElement.classes[VISIBILITY_HIDDEN_IF_NO_SCRIPT_CLASS])
    .withContext('has hidden visibility if no script')
    .toBeTrue()
}
