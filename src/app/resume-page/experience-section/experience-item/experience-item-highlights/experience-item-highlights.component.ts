import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
} from '@angular/core'
import { slideDownOnEnterAndSlideUpOnLeave } from '../../../../common/animations'

@Component({
  selector: 'app-experience-item-highlights',
  template: `<ul>
    <li *ngFor="let highlight of highlights">
      {{ highlight }}
    </li>
  </ul>`,
  styleUrls: ['./experience-item-highlights.component.scss'],
  animations: [slideDownOnEnterAndSlideUpOnLeave('enterAndLeave')],
})
export class ExperienceItemHighlightsComponent {
  @Input({ required: true }) public highlights!: readonly string[]

  @HostBinding('@enterAndLeave') public enterAndLeaveAnimation = true
  public enterAndLeaveAnimationDone = new EventEmitter<void>()
  @HostListener('@enterAndLeave.done')
  protected onEnterAndLeaveAnimationDone() {
    this.enterAndLeaveAnimationDone.emit()
  }
}
