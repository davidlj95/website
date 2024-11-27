import { Component, Inject, input, linkedSignal, signal } from '@angular/core'
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
  readonly contents = input.required<readonly ChippedContent[]>()
  readonly activeContent = linkedSignal<ChippedContent>(
    () => this.contents()[0],
  )
  readonly isActive = signal<boolean>(false)

  constructor(
    @Inject(SCROLL_INTO_VIEW) protected _scrollIntoView: ScrollIntoView,
  ) {}

  select(content: ChippedContent) {
    if (this.activeContent() === content) {
      this.isActive.update((isActive) => !isActive)
      return
    }
    this.isActive.set(true)
    this.activeContent.set(content)
  }
}
