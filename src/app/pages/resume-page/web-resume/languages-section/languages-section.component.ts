import { Component, inject } from '@angular/core'
import { CardGridComponent } from '@/common/card-grid/card-grid.component'

import { SectionTitleComponent } from '../section-title/section-title.component'
import { LANGUAGE_SERVICE } from '../../data/languages/language-service'
import { LanguageComponent } from './language/language.component'
import { toSignal } from '@angular/core/rxjs-interop'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'section[appLanguages]',
  imports: [CardGridComponent, SectionTitleComponent, LanguageComponent],
  templateUrl: './languages-section.component.html',
})
export class LanguagesSectionComponent {
  protected readonly _languages = toSignal(inject(LANGUAGE_SERVICE).getAll())
}
