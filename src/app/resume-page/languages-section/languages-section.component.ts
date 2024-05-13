import { Component } from '@angular/core'
import { CardGridComponent } from '../card-grid/card-grid.component'
import { ExperienceItemComponent } from '../experience-section/experience-item/experience-item.component'
import { NgForOf } from '@angular/common'
import { SectionTitleComponent } from '../section-title/section-title.component'

@Component({
  selector: 'app-languages-section',
  standalone: true,
  imports: [
    CardGridComponent,
    ExperienceItemComponent,
    NgForOf,
    SectionTitleComponent,
  ],
  templateUrl: './languages-section.component.html',
})
export class LanguagesSectionComponent {}
