import { Component } from '@angular/core'
import { ExperienceItem } from './experience-item/experience-item'
import { ExperienceItemsService } from './experience-items.service'

@Component({
  selector: 'app-professional-experience',
  templateUrl: './professional-experience.component.html',
  styleUrls: ['./professional-experience.component.scss'],
})
export class ProfessionalExperienceComponent {
  protected items: ReadonlyArray<ExperienceItem>

  constructor(experienceItemsService: ExperienceItemsService) {
    this.items = experienceItemsService.getExperienceItems()
  }
}
