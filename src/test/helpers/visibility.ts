// TODO: those could be custom matchers
import { DebugElement } from '@angular/core'

export function expectIsInLayout(debugElement: DebugElement) {
  expect((debugElement.nativeElement as Element).checkVisibility())
    .withContext('is in layout')
    .toBeTrue()
}

export function expectIsNotInLayout(debugElement: DebugElement) {
  expect((debugElement.nativeElement as Element).checkVisibility())
    .withContext('is not in layout')
    .toBeFalse()
}

export function expectIsNotVisible(debugElement: DebugElement) {
  expect(
    (debugElement.nativeElement as Element).checkVisibility({
      checkVisibilityCSS: true,
      checkOpacity: true,
    }),
  )
    .withContext('is not visible')
    .toBeFalse()
}
