import { Component, input } from '@angular/core'

import { ContentChipListComponent } from '../../../content-chip-list/content-chip-list.component'
import { ContentChipComponent } from '../../../content-chip/content-chip.component'

@Component({
  selector: 'app-education-courses',
  templateUrl: './education-courses.component.html',
  imports: [ContentChipListComponent, ContentChipComponent],
})
export class EducationCoursesComponent {
  readonly courses = input.required<readonly string[]>()
}
