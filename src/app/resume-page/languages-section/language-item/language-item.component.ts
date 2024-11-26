import { Component, Input } from '@angular/core'
import { LanguageItem } from './language-item'
import { CardComponent } from '../../card/card.component'
import { CardHeaderComponent } from '../../card/card-header/card-header.component'
import { CardHeaderSubtitleComponent } from '../../card/card-header/card-header-subtitle/card-header-subtitle.component'
import { CardHeaderTextsComponent } from '../../card/card-header/card-header-texts/card-header-texts.component'
import { CardHeaderTitleComponent } from '../../card/card-header/card-header-title/card-header-title.component'
import { TestIdDirective } from '@/common/test-id.directive'
import { LanguageTagComponent } from './language-tag/language-tag.component'

@Component({
  selector: 'app-language-item',
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardHeaderSubtitleComponent,
    CardHeaderTextsComponent,
    CardHeaderTitleComponent,
    TestIdDirective,
    LanguageTagComponent,
  ],
  templateUrl: './language-item.component.html',
})
export class LanguageItemComponent {
  @Input({ required: true }) item!: LanguageItem
}
