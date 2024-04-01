import { Component, Inject, Input } from '@angular/core'
import { ChipComponent } from '../chip/chip.component'
import { NgClass, NgComponentOutlet, NgFor } from '@angular/common'
import { TestIdDirective } from '@/common/test-id.directive'
import { ChippedContent } from './chipped-content'
import {
  DISPLAY_BLOCK_IF_NO_SCRIPT_CLASS,
  DISPLAY_NONE_IF_NO_SCRIPT_CLASS,
} from '@/common/no-script'
import { EMPHASIZED_DURATION_MS, TIMING_FUNCTION } from '@/common/animations'
import {
  animate,
  AUTO_STYLE,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations'
import { PLATFORM_SERVICE, PlatformService } from '@/common/platform.service'

@Component({
  selector: 'app-chipped-content',
  templateUrl: './chipped-content.component.html',
  styleUrls: ['./chipped-content.component.scss'],
  standalone: true,
  imports: [NgFor, ChipComponent, TestIdDirective, NgClass, NgComponentOutlet],
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
  @Input() public contents!: ReadonlyArray<ChippedContent>

  constructor(
    @Inject(PLATFORM_SERVICE) protected _platformService: PlatformService,
  ) {}

  protected _displayedContent: DisplayedContent

  protected readonly DISPLAY_BLOCK_IF_NO_SCRIPT_CLASS =
    DISPLAY_BLOCK_IF_NO_SCRIPT_CLASS
  protected readonly DISPLAY_NONE_IF_NO_SCRIPT_CLASS =
    DISPLAY_NONE_IF_NO_SCRIPT_CLASS
}

type DisplayedContent = ChippedContent | undefined
