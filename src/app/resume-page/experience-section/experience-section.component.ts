import { Component, Inject } from '@angular/core'
import { ExperienceItem } from './experience-item/experience-item'
import { ExperienceItemComponent } from './experience-item/experience-item.component'

import { SectionTitleComponent } from '../section-title/section-title.component'
import { CardGridComponent } from '../card-grid/card-grid.component'
import {
  GET_EXPERIENCE_ITEMS,
  GetExperienceItems,
} from './get-experience-items'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'section[appExperience]',
  templateUrl: './experience-section.component.html',
  imports: [SectionTitleComponent, CardGridComponent, ExperienceItemComponent],
})
export class ExperienceSectionComponent {
  protected readonly _items: readonly ExperienceItem[]

  constructor(
    @Inject(GET_EXPERIENCE_ITEMS) getExperienceItems: GetExperienceItems,
  ) {
    this._items = getExperienceItems()
  }
}
