import { DebugElement } from '@angular/core'

export const textContent = (debugElement: DebugElement): string | undefined =>
  debugElement.nativeElement?.textContent?.trim()
