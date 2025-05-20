import { Component, input } from '@angular/core'
import { Language } from '../../../data/languages/language'
import { CardComponent } from '@/common/card/card.component'
import { CardHeaderComponent } from '@/common/card/card-header/card-header.component'
import { CardHeaderTextsComponent } from '@/common/card/card-header/card-header-texts/card-header-texts.component'
import { TestIdDirective } from '@/common/test-id.directive'
import { LanguageTagComponent } from './language-tag/language-tag.component'

@Component({
  selector: 'app-language',
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardHeaderTextsComponent,
    TestIdDirective,
    LanguageTagComponent,
  ],
  templateUrl: './language.component.html',
})
export class LanguageComponent {
  readonly language = input.required<Language>()
}
