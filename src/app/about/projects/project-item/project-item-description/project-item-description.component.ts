import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
} from '@angular/core'
import { slideDownOnEnterAndSlideUpOnLeave } from '../../../../common/animations'

@Component({
  selector: 'app-project-item-description',
  template: '{{ description }}',
  styles: [':host { overflow: hidden}'],
  animations: [slideDownOnEnterAndSlideUpOnLeave('enterAndLeave')],
})
export class ProjectItemDescriptionComponent {
  @Input({ required: true }) public description!: string

  @HostBinding('@enterAndLeave') public readonly enterOrLeaveAnimation = true
  public enterAndLeaveAnimationDone = new EventEmitter<void>()
  @HostListener('@enterAndLeave.done')
  protected onEnterAndLeaveAnimationDone() {
    this.enterAndLeaveAnimationDone.emit()
  }
}
