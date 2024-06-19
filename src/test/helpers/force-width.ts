import { DebugElement } from '@angular/core'

export function forcePxWidth(debugElement: DebugElement, pxAmount: number) {
  debugElement.styles['width'] = pxAmount + 'px'
}
