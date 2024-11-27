import { DebugElement } from '@angular/core'

export const innerHtml = (debugElement: DebugElement) =>
  (debugElement.nativeElement as Element).innerHTML.trim()
