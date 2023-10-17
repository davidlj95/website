import { Component } from '@angular/core'
import { ExperienceItem } from './experience-item/experience-item'
import { ExperienceItemsService } from './experience-items.service'

@Component({
  selector: 'app-experience-section',
  templateUrl: './experience-section.component.html',
  styleUrls: ['./experience-section.component.scss'],
})
export class ExperienceSectionComponent {
  protected items: ReadonlyArray<ExperienceItem>

  constructor(experienceItemsService: ExperienceItemsService) {
    this.items = experienceItemsService.getExperienceItems()
  }
}
