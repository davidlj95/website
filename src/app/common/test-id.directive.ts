import { Directive, effect, ElementRef, input } from '@angular/core'

@Directive({ selector: '[appTestId]' })
export class TestIdDirective {
  readonly appTestId = input.required<string>()

  constructor(private el: ElementRef) {
    effect(() => {
      if (isDevMode) {
        ;(this.el.nativeElement as Element).setAttribute(
          TEST_ID_ATTRIBUTE,
          this.appTestId(),
        )
      }
    })
  }
}

// As per Testing Library
// https://testing-library.com/docs/queries/bytestid/
export const TEST_ID_ATTRIBUTE = 'data-testid'
