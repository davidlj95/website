import { Directive, effect, ElementRef, input, inject } from '@angular/core'

@Directive({ selector: '[appTestId]' })
export class TestIdDirective {
  readonly appTestId = input.required<string>()

  constructor() {
    const elRef = inject<ElementRef<Element>>(ElementRef)

    effect(() => {
      if (isDevMode) {
        elRef.nativeElement.setAttribute(TEST_ID_ATTRIBUTE, this.appTestId())
      }
    })
  }
}

// As per Testing Library
// https://testing-library.com/docs/queries/bytestid/
/** @visibleForTesting */
export const TEST_ID_ATTRIBUTE = 'data-testid'
