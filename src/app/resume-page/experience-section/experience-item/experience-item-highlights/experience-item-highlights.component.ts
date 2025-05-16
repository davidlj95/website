import { Component, input } from '@angular/core'
import { MdLinksPipe } from '../../../md-links.pipe'

@Component({
  selector: 'app-experience-item-highlights',
  template: `<ul>
    @for (highlight of highlights(); track highlight) {
      <li [innerHTML]="highlight | mdLinks"></li>
    }
  </ul>`,
  styleUrls: ['./experience-item-highlights.component.scss'],
  imports: [MdLinksPipe],
})
export class ExperienceItemHighlightsComponent {
  readonly highlights = input.required<readonly string[]>()
}
