import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
} from '@angular/core'
import { slideDownOnEnterAndSlideUpOnLeave } from '@common/animations'

@Component({
  selector: 'app-education-item-score',
  template: '{{ score }}',
  styles: [
    `
      :host {
        overflow: hidden;
      }
    `,
  ],
  animations: [slideDownOnEnterAndSlideUpOnLeave('enterAndLeave')],
  standalone: true,
})
export class EducationItemScoreComponent {
  @Input({ required: true }) score!: string

  @HostBinding('@enterAndLeave') public readonly enterOrLeaveAnimation = true
  public enterAndLeaveAnimationDone = new EventEmitter<void>()
  @HostListener('@enterAndLeave.done')
  protected onEnterAndLeaveAnimationDone() {
    this.enterAndLeaveAnimationDone.emit()
  }
}
