import { Component } from '@angular/core'
import { EducationItem } from './education-item/education-item'
import { EducationItemsService } from './education-items.service'

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
})
export class EducationComponent {
  protected items: ReadonlyArray<EducationItem>

  constructor(educationItemsService: EducationItemsService) {
    this.items = educationItemsService.getEducationItems()
  }
}
