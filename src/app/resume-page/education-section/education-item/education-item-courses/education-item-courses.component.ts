import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
} from '@angular/core'
import { slideDownOnEnterAndSlideUpOnLeave } from '../../../../common/animations'
import { NgFor } from '@angular/common'

@Component({
  selector: 'app-education-item-courses',
  templateUrl: './education-item-courses.component.html',
  styleUrls: ['./education-item-courses.component.scss'],
  animations: [slideDownOnEnterAndSlideUpOnLeave('enterAndLeave')],
  standalone: true,
  imports: [NgFor],
})
export class EducationItemCoursesComponent {
  @Input({ required: true }) courses!: readonly string[]

  @HostBinding('@enterAndLeave') public readonly enterOrLeaveAnimation = true
  public enterAndLeaveAnimationDone = new EventEmitter<void>()
  @HostListener('@enterAndLeave.done')
  protected onEnterAndLeaveAnimationDone() {
    this.enterAndLeaveAnimationDone.emit()
  }
}
