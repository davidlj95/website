import { Component, inject } from '@angular/core'
import { EducationItemComponent } from './education-item/education-item.component'

import { SectionTitleComponent } from '../section-title/section-title.component'
import { CardGridComponent } from '../card-grid/card-grid.component'
import { GET_EDUCATION_ITEMS } from '../data/get-education-items'

import { toSignal } from '@angular/core/rxjs-interop'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'section[appEducation]',
  templateUrl: './education-section.component.html',
  imports: [SectionTitleComponent, CardGridComponent, EducationItemComponent],
})
export class EducationSectionComponent {
  protected readonly _educations = toSignal(inject(GET_EDUCATION_ITEMS)())
}
