import { Component } from '@angular/core'
import { EducationItem } from './education-item/education-item'
import { EducationItemsService } from './education-items.service'
import { EducationItemComponent } from './education-item/education-item.component'
import { NgFor } from '@angular/common'
import { SectionTitleComponent } from '../section-title/section-title.component'
import { CardGridComponent } from '../card-grid/card-grid.component'

@Component({
  selector: 'app-education-section',
  templateUrl: './education-section.component.html',
  styleUrls: ['./education-section.component.scss'],
  standalone: true,
  imports: [
    SectionTitleComponent,
    NgFor,
    EducationItemComponent,
    CardGridComponent,
  ],
})
export class EducationSectionComponent {
  protected items: ReadonlyArray<EducationItem>

  constructor(educationItemsService: EducationItemsService) {
    this.items = educationItemsService.getEducationItems()
  }
}
