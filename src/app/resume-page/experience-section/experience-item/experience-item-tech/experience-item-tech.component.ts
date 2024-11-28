import { Component, computed, input } from '@angular/core'
import { TechnologyItem } from '../../../technology/technology-item'
import { ContentChipComponent } from '../../../content-chip/content-chip.component'
import { ContentChipListComponent } from '../../../content-chip-list/content-chip-list.component'

import { TechnologyComponent } from '../../../technology/technology.component'

@Component({
  selector: 'app-experience-item-tech',
  imports: [
    ContentChipComponent,
    ContentChipListComponent,
    TechnologyComponent,
  ],
  templateUrl: './experience-item-tech.component.html',
  styleUrl: './experience-item-tech.component.scss',
})
export class ExperienceItemTechComponent {
  technologies = input.required<readonly TechnologyItem[]>()
  projectNames = input.required<readonly string[]>()

  protected _projectNamesList = computed<string>(() =>
    new Intl.ListFormat('en').format(this.projectNames()),
  )
}
