import { Directive, ElementRef, Input, OnChanges } from '@angular/core'

@Directive({
  selector: '[appTestId]',
})
export class TestIdDirective implements OnChanges {
  @Input('appTestId') public id!: string

  constructor(private el: ElementRef) {}

  ngOnChanges(): void {
    this.el.nativeElement.setAttribute(TEST_ID_ATTRIBUTE, this.id)
  }
}

export const TEST_ID_ATTRIBUTE = 'data-test-id'
