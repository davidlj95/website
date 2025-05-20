import { Component, input } from '@angular/core'

import { TechnologyComponent } from '../../../technology/technology.component'
import { ContentChipListComponent } from '../../../content-chip-list/content-chip-list.component'
import { ContentChipComponent } from '../../../content-chip/content-chip.component'

@Component({
  selector: 'app-project-technologies',
  imports: [
    TechnologyComponent,
    ContentChipListComponent,
    ContentChipComponent,
  ],
  templateUrl: './project-technologies.component.html',
})
export class ProjectTechnologiesComponent {
  readonly technologies = input.required<readonly string[]>()
}
