import { Component, Inject } from '@angular/core'
import { ExperienceItem } from './experience-item/experience-item'
import { ExperienceItemComponent } from './experience-item/experience-item.component'
import { NgFor } from '@angular/common'
import { SectionTitleComponent } from '../section-title/section-title.component'
import { CardGridComponent } from '../card-grid/card-grid.component'
import {
  GET_EXPERIENCE_ITEMS,
  GetExperienceItems,
} from './get-experience-items'

@Component({
  selector: 'app-experience-section',
  templateUrl: './experience-section.component.html',
  imports: [
    SectionTitleComponent,
    CardGridComponent,
    NgFor,
    ExperienceItemComponent,
  ],
})
export class ExperienceSectionComponent {
  protected readonly items: readonly ExperienceItem[]

  constructor(
    @Inject(GET_EXPERIENCE_ITEMS) getExperienceItems: GetExperienceItems,
  ) {
    this.items = getExperienceItems()
  }
}
