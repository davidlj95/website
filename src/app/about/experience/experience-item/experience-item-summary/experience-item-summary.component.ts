import { Component, HostBinding, Input } from '@angular/core'
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
}
