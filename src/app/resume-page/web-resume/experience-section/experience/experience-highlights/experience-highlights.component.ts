import { Component, input } from '@angular/core'
import { MdLinksPipe } from '../../../../md-links.pipe'

@Component({
  selector: 'app-experience-highlights',
  template: `<ul>
    @for (highlight of highlights(); track highlight) {
      <li [innerHTML]="highlight | mdLinks"></li>
    }
  </ul>`,
  styleUrls: ['./experience-highlights.component.scss'],
  imports: [MdLinksPipe],
})
export class ExperienceHighlightsComponent {
  readonly highlights = input.required<readonly string[]>()
}
