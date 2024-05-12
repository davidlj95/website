import { Directive, ElementRef, Input, OnChanges } from '@angular/core'

@Directive({
  selector: '[appTestId]',
  standalone: true,
})
export class TestIdDirective implements OnChanges {
  @Input() public appTestId!: string

  constructor(private el: ElementRef) {}

  ngOnChanges(): void {
    if (isDevMode) {
      this.el.nativeElement.setAttribute(TEST_ID_ATTRIBUTE, this.appTestId)
    }
  }
}

// As per Testing Library
// https://testing-library.com/docs/queries/bytestid/
export const TEST_ID_ATTRIBUTE = 'data-testid'
