import { Component, inject } from '@angular/core'
import { EducationComponent } from './education/education.component'

import { SectionTitleComponent } from '../section-title/section-title.component'
import { CardGridComponent } from '../card-grid/card-grid.component'
import { EDUCATION_SERVICE } from '../data/education-service'

import { toSignal } from '@angular/core/rxjs-interop'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'section[appEducation]',
  templateUrl: './education-section.component.html',
  imports: [SectionTitleComponent, CardGridComponent, EducationComponent],
})
export class EducationSectionComponent {
  protected readonly _educations = toSignal(inject(EDUCATION_SERVICE).getAll())
}
