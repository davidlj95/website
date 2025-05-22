import { Component, inject } from '@angular/core'
import { CardGridComponent } from '@/common/card-grid/card-grid.component'

import { SectionTitleComponent } from '../section-title/section-title.component'
import { LanguageComponent } from './language/language.component'
import { toSignal } from '@angular/core/rxjs-interop'
import { GET_JSON_RESUME_LANGUAGES } from '../../data/languages/get-json-resume-languages'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'section[appLanguages]',
  imports: [CardGridComponent, SectionTitleComponent, LanguageComponent],
  templateUrl: './languages-section.component.html',
})
export class LanguagesSectionComponent {
  protected readonly _languages = toSignal(inject(GET_JSON_RESUME_LANGUAGES)())
}
