import { LanguagesSectionComponent } from './languages-section.component'
import { SectionTitleComponent } from '../section-title/section-title.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { MockComponents, MockProvider } from 'ng-mocks'
import { makeLanguage } from '../../data/languages/__tests__/make-language'
import { LanguageComponent } from './language/language.component'
import { CardGridComponent } from '@/common/card-grid/card-grid.component'
import { By } from '@angular/platform-browser'
import { GET_JSON_RESUME_LANGUAGES } from '../../data/languages/get-json-resume-languages'
import { Language } from '../../data/languages/language'
import { of } from 'rxjs'

describe('LanguagesSectionComponent', () => {
  it('should create', () => {
    const [fixture] = makeSut()

    expect(fixture.componentInstance).toBeTruthy()
  })

  it('should display all languages', () => {
    const languages = [makeLanguage(), makeLanguage()]

    const [fixture] = makeSut({ languages })
    fixture.detectChanges()

    const languageElements = fixture.debugElement.queryAll(
      By.directive(LanguageComponent),
    )

    expect(languageElements.length).toBe(languages.length)
  })
})

function makeSut({ languages }: { languages?: readonly Language[] } = {}) {
  return componentTestSetup(LanguagesSectionComponent, {
    imports: [
      MockComponents(
        SectionTitleComponent,
        CardGridComponent,
        LanguageComponent,
      ),
    ],
    providers: [
      MockProvider(GET_JSON_RESUME_LANGUAGES, () => of(languages ?? [])),
    ],
  })
}
