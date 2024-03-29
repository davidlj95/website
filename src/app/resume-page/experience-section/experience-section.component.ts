import { Component } from '@angular/core'
import { ExperienceItem } from './experience-item/experience-item'
import { ExperienceItemsService } from './experience-items.service'
import { ExperienceItemComponent } from './experience-item/experience-item.component'
import { NgFor } from '@angular/common'
import { SectionTitleComponent } from '../section-title/section-title.component'
import { CardGridComponent } from '../card-grid/card-grid.component'

@Component({
  selector: 'app-experience-section',
  templateUrl: './experience-section.component.html',
  styleUrls: ['./experience-section.component.scss'],
  standalone: true,
  imports: [
    SectionTitleComponent,
    NgFor,
    ExperienceItemComponent,
    CardGridComponent,
  ],
})
export class ExperienceSectionComponent {
  protected items: ReadonlyArray<ExperienceItem>

  constructor(experienceItemsService: ExperienceItemsService) {
    this.items = experienceItemsService.getExperienceItems()
  }
}
