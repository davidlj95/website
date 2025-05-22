import { Component, inject } from '@angular/core'
import { EducationComponent } from './education/education.component'

import { SectionTitleComponent } from '../section-title/section-title.component'
import { CardGridComponent } from '@/common/card-grid/card-grid.component'

import { toSignal } from '@angular/core/rxjs-interop'
import { GET_JSON_RESUME_EDUCATIONS } from '../../data/education/get-json-resume-educations'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'section[appEducation]',
  templateUrl: './education-section.component.html',
  imports: [SectionTitleComponent, CardGridComponent, EducationComponent],
})
export class EducationSectionComponent {
  protected readonly _educations = toSignal(
    inject(GET_JSON_RESUME_EDUCATIONS)(),
  )
}
