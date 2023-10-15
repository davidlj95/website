import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
} from '@angular/core'
import { slideDownOnEnterAndSlideUpOnLeave } from '../../../../common/animations'

@Component({
  selector: 'app-experience-item-summary',
  template: '{{ summary }}',
  styles: [
    `
      :host {
        overflow: hidden;
      }
    `,
  ],
  animations: [slideDownOnEnterAndSlideUpOnLeave('enterAndLeave')],
})
export class ExperienceItemSummaryComponent {
  @HostBinding('@enterAndLeave') public readonly enterOrLeaveAnimation = true
  @Input({ required: true })
  public summary!: string

  public enterAndLeaveAnimationDone = new EventEmitter<void>()
  @HostListener('@enterAndLeave.done')
  protected onEnterAndLeaveAnimationDone() {
    this.enterAndLeaveAnimationDone.emit()
  }
}
