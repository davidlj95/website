import { Component, Inject } from '@angular/core'
import { CardGridComponent } from '../card-grid/card-grid.component'
import { ExperienceItemComponent } from '../experience-section/experience-item/experience-item.component'
import { NgForOf } from '@angular/common'
import { SectionTitleComponent } from '../section-title/section-title.component'
import { LanguageItem } from './language-item/language-item'
import { GET_LANGUAGE_ITEMS, GetLanguageItems } from './get-language-items'
import { LanguageItemComponent } from './language-item/language-item.component'

@Component({
  selector: 'app-languages-section',
  standalone: true,
  imports: [
    CardGridComponent,
    ExperienceItemComponent,
    NgForOf,
    SectionTitleComponent,
    LanguageItemComponent,
  ],
  templateUrl: './languages-section.component.html',
})
export class LanguagesSectionComponent {
  protected readonly items: ReadonlyArray<LanguageItem>

  constructor(@Inject(GET_LANGUAGE_ITEMS) getLanguageItems: GetLanguageItems) {
    this.items = getLanguageItems()
  }
}
