import { Component, Inject, Input } from '@angular/core'
import { ChipComponent } from '../chip/chip.component'
import { NgComponentOutlet } from '@angular/common'
import { ChippedContent } from './chipped-content'
import { EMPHASIZED_DURATION_MS, TIMING_FUNCTION } from '@/common/animations'
import {
  animate,
  AUTO_STYLE,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations'
import { SCROLL_INTO_VIEW, ScrollIntoView } from '@/common/scroll-into-view'

@Component({
  selector: 'app-chipped-content',
  templateUrl: './chipped-content.component.html',
  styleUrls: ['./chipped-content.component.scss'],
  imports: [ChipComponent, NgComponentOutlet],
  animations: [
    trigger('contentDisplayed', [
      state('false', style({ display: 'none' })),
      state('true', style({ display: AUTO_STYLE })),
      transition('false -> true', [
        style({ height: '0', display: AUTO_STYLE }),
        animate(
          `${EMPHASIZED_DURATION_MS}ms ${TIMING_FUNCTION}`,
          style({
            height: AUTO_STYLE,
          }),
        ),
      ]),
      transition('true -> false', [
        animate(
          `${EMPHASIZED_DURATION_MS}ms ${TIMING_FUNCTION}`,
          style({ height: '0' }),
        ),
      ]),
    ]),
  ],
})
export class ChippedContentComponent {
  @Input() contents!: readonly ChippedContent[]

  constructor(
    @Inject(SCROLL_INTO_VIEW) protected _scrollIntoView: ScrollIntoView,
  ) {}

  protected _active = false
  protected _activeIndex = 0

  onSelect(index: number) {
    if (this._activeIndex == index) {
      this._active = !this._active
      return
    }
    this._active = true
    this._activeIndex = index
  }
}
