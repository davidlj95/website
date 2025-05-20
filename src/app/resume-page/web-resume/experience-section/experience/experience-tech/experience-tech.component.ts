import { Component, computed, input } from '@angular/core'
import { ContentChipComponent } from '@/common/content-chip/content-chip.component'
import { ContentChipListComponent } from '@/common/content-chip-list/content-chip-list.component'

import { TechnologyComponent } from '../../../../technology/technology.component'

@Component({
  selector: 'app-experience-tech',
  imports: [
    ContentChipComponent,
    ContentChipListComponent,
    TechnologyComponent,
  ],
  templateUrl: './experience-tech.component.html',
  styleUrl: './experience-tech.component.scss',
})
export class ExperienceTechComponent {
  technologies = input.required<readonly string[]>()
  projectNames = input.required<readonly string[]>()

  protected _projectNamesList = computed<string>(() =>
    new Intl.ListFormat('en').format(this.projectNames()),
  )
}
