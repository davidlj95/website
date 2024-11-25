import { Component, Input } from '@angular/core'
import { NgFor } from '@angular/common'
import { ContentChipListComponent } from '../../../content-chip-list/content-chip-list.component'
import { ContentChipComponent } from '../../../content-chip/content-chip.component'

@Component({
  selector: 'app-education-item-courses',
  templateUrl: './education-item-courses.component.html',
  imports: [NgFor, ContentChipListComponent, ContentChipComponent],
})
export class EducationItemCoursesComponent {
  @Input({ required: true }) courses!: readonly string[]
}
