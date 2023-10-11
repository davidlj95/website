import { Component } from '@angular/core'
import { ExperienceItem } from './experience-item/experience-item'
import { ExperienceItemsService } from './experience-items.service'

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent {
  protected items: ReadonlyArray<ExperienceItem>

  constructor(experienceItemsService: ExperienceItemsService) {
    this.items = experienceItemsService.getExperienceItems()
  }
}
