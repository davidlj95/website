import { Component, Input } from '@angular/core'
import { NgFor } from '@angular/common'

@Component({
  selector: 'app-experience-item-highlights',
  template: `<ul>
    <li *ngFor="let highlight of highlights">
      {{ highlight }}
    </li>
  </ul>`,
  styleUrls: ['./experience-item-highlights.component.scss'],
  imports: [NgFor],
})
export class ExperienceItemHighlightsComponent {
  @Input({ required: true }) public highlights!: readonly string[]
}
