import { Component } from '@angular/core'
import { ExperienceItem } from './experience-item/experience-item'
import { ExperienceItemsService } from './experience-items.service'
import { ExperienceItemComponent } from './experience-item/experience-item.component'
import { NgFor } from '@angular/common'
import { H2Component } from '../h2/h2.component'

@Component({
  selector: 'app-experience-section',
  templateUrl: './experience-section.component.html',
  styleUrls: ['./experience-section.component.scss'],
  standalone: true,
  imports: [H2Component, NgFor, ExperienceItemComponent],
})
export class ExperienceSectionComponent {
  protected items: ReadonlyArray<ExperienceItem>

  constructor(experienceItemsService: ExperienceItemsService) {
    this.items = experienceItemsService.getExperienceItems()
  }
}
