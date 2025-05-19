import { Component, Inject } from '@angular/core'
import { Education } from '../data/education'
import { EducationItemComponent } from './education-item/education-item.component'

import { SectionTitleComponent } from '../section-title/section-title.component'
import { CardGridComponent } from '../card-grid/card-grid.component'
import {
  GET_EDUCATION_ITEMS,
  GetEducationItems,
} from '../data/get-education-items'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'section[appEducation]',
  templateUrl: './education-section.component.html',
  imports: [SectionTitleComponent, CardGridComponent, EducationItemComponent],
})
export class EducationSectionComponent {
  protected readonly _items: readonly Education[]

  constructor(
    @Inject(GET_EDUCATION_ITEMS) getEducationItems: GetEducationItems,
  ) {
    this._items = getEducationItems()
  }
}
