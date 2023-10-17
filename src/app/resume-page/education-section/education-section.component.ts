import { Component } from '@angular/core'
import { EducationItem } from './education-item/education-item'
import { EducationItemsService } from './education-items.service'

@Component({
  selector: 'app-education-section',
  templateUrl: './education-section.component.html',
  styleUrls: ['./education-section.component.scss'],
})
export class EducationSectionComponent {
  protected items: ReadonlyArray<EducationItem>

  constructor(educationItemsService: EducationItemsService) {
    this.items = educationItemsService.getEducationItems()
  }
}
