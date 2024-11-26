import { Component, input } from '@angular/core'

@Component({
  selector: 'app-experience-item-highlights',
  template: `<ul>
    @for (highlight of highlights(); track highlight) {
      <li>
        {{ highlight }}
      </li>
    }
  </ul>`,
  styleUrls: ['./experience-item-highlights.component.scss'],
  imports: [],
})
export class ExperienceItemHighlightsComponent {
  public readonly highlights = input.required<readonly string[]>()
}
