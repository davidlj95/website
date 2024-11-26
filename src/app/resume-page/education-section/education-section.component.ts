import { Component, Inject } from '@angular/core'
import { EducationItem } from './education-item/education-item'
import { EducationItemComponent } from './education-item/education-item.component'
import { NgFor } from '@angular/common'
import { SectionTitleComponent } from '../section-title/section-title.component'
import { CardGridComponent } from '../card-grid/card-grid.component'
import { GET_EDUCATION_ITEMS, GetEducationItems } from './get-education-items'

@Component({
  selector: 'app-education-section',
  templateUrl: './education-section.component.html',
  imports: [
    SectionTitleComponent,
    CardGridComponent,
    NgFor,
    EducationItemComponent,
  ],
})
export class EducationSectionComponent {
  protected readonly items: readonly EducationItem[]

  constructor(
    @Inject(GET_EDUCATION_ITEMS) getEducationItems: GetEducationItems,
  ) {
    this.items = getEducationItems()
  }
}
