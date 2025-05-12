import { Component, Inject } from '@angular/core'
import { CardGridComponent } from '../card-grid/card-grid.component'

import { SectionTitleComponent } from '../section-title/section-title.component'
import { LanguageItem } from './language-item/language-item'
import { GET_LANGUAGE_ITEMS, GetLanguageItems } from './get-language-items'
import { LanguageItemComponent } from './language-item/language-item.component'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'section[appLanguages]',
  imports: [CardGridComponent, SectionTitleComponent, LanguageItemComponent],
  templateUrl: './languages-section.component.html',
})
export class LanguagesSectionComponent {
  protected readonly _items: readonly LanguageItem[]

  constructor(@Inject(GET_LANGUAGE_ITEMS) getLanguageItems: GetLanguageItems) {
    this._items = getLanguageItems()
  }
}
