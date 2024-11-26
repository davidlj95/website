import { Component, input } from '@angular/core'

import { TechnologyComponent } from '../../../technology/technology.component'
import { TechnologyItem } from '../../../technology/technology-item'
import { ContentChipListComponent } from '../../../content-chip-list/content-chip-list.component'
import { ContentChipComponent } from '../../../content-chip/content-chip.component'

@Component({
  selector: 'app-project-item-technologies',
  imports: [
    TechnologyComponent,
    ContentChipListComponent,
    ContentChipComponent,
  ],
  templateUrl: './project-item-technologies.component.html',
})
export class ProjectItemTechnologiesComponent {
  public readonly items = input.required<readonly TechnologyItem[]>()
}
