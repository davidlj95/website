import { Component, Inject } from '@angular/core'
import { EducationItem } from './education-item/education-item'
import { EducationItemComponent } from './education-item/education-item.component'

import { SectionTitleComponent } from '../section-title/section-title.component'
import { CardGridComponent } from '../card-grid/card-grid.component'
import { GET_EDUCATION_ITEMS, GetEducationItems } from './get-education-items'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'section[appEducation]',
  templateUrl: './education-section.component.html',
  imports: [SectionTitleComponent, CardGridComponent, EducationItemComponent],
})
export class EducationSectionComponent {
  protected readonly _items: readonly EducationItem[]

  constructor(
    @Inject(GET_EDUCATION_ITEMS) getEducationItems: GetEducationItems,
  ) {
    this._items = getEducationItems()
  }
}
