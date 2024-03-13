import { Component } from '@angular/core'
import { EducationItem } from './education-item/education-item'
import { EducationItemsService } from './education-items.service'
import { EducationItemComponent } from './education-item/education-item.component'
import { NgFor } from '@angular/common'
import { H2Component } from '../h2/h2.component'

@Component({
  selector: 'app-education-section',
  templateUrl: './education-section.component.html',
  styleUrls: ['./education-section.component.scss'],
  standalone: true,
  imports: [H2Component, NgFor, EducationItemComponent],
})
export class EducationSectionComponent {
  protected items: ReadonlyArray<EducationItem>

  constructor(educationItemsService: EducationItemsService) {
    this.items = educationItemsService.getEducationItems()
  }
}
