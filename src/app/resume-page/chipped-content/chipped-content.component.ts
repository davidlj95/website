import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ChipComponent } from '../chip/chip.component'
import { NgClass, NgComponentOutlet, NgFor } from '@angular/common'
import { TestIdDirective } from '@common/test-id.directive'
import { ChippedContent } from './chipped-content'
import {
  DISPLAY_BLOCK_IF_NO_SCRIPT_CLASS,
  DISPLAY_NONE_IF_NO_SCRIPT_CLASS,
} from '@common/no-script'
import { slideDownOnEnterAndSlideUpOnLeave } from '@common/animations'

@Component({
  selector: 'app-chipped-content',
  templateUrl: './chipped-content.component.html',
  styleUrls: ['./chipped-content.component.scss'],
  standalone: true,
  imports: [NgFor, ChipComponent, TestIdDirective, NgClass, NgComponentOutlet],
  animations: [slideDownOnEnterAndSlideUpOnLeave('enterAndLeave')],
})
export class ChippedContentComponent {
  @Input() public contents!: ReadonlyArray<ChippedContent>
  @Output() displayedContentChange = new EventEmitter<DisplayedContent>()

  constructor() {}

  protected _displayedContent: DisplayedContent
  public set displayedContent(content: DisplayedContent) {
    const newDisplayedContent =
      content !== this._displayedContent ? content : undefined
    this._displayedContent = newDisplayedContent
    this.displayedContentChange.next(newDisplayedContent)
  }

  protected readonly DISPLAY_BLOCK_IF_NO_SCRIPT_CLASS =
    DISPLAY_BLOCK_IF_NO_SCRIPT_CLASS
  protected readonly DISPLAY_NONE_IF_NO_SCRIPT_CLASS =
    DISPLAY_NONE_IF_NO_SCRIPT_CLASS
}

type DisplayedContent = ChippedContent | undefined
