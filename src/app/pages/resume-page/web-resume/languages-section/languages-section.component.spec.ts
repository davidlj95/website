import { LanguagesSectionComponent } from './languages-section.component'
import { SectionTitleComponent } from '../section-title/section-title.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { MockComponents, MockProvider } from 'ng-mocks'
import { makeLanguage } from '../../data/languages/__tests__/make-language'
import {
  LANGUAGE_SERVICE,
  LanguageService,
} from '../../data/languages/language-service'
import { LanguageComponent } from './language/language.component'
import { CardGridComponent } from '@/common/card-grid/card-grid.component'
import { By } from '@angular/platform-browser'
import { of } from 'rxjs'

describe('LanguagesSectionComponent', () => {
  it('should create', () => {
    const [fixture] = makeSut()

    expect(fixture.componentInstance).toBeTruthy()
  })

  it('should display all languages', () => {
    const languages = [makeLanguage(), makeLanguage()]
    const languageService = {
      getAll: jasmine
        .createSpy<LanguageService['getAll']>()
        .and.returnValue(of(languages)),
    } satisfies LanguageService

    const [fixture] = makeSut({ languageService })
    fixture.detectChanges()

    const itemElements = fixture.debugElement.queryAll(
      By.directive(LanguageComponent),
    )

    expect(itemElements.length).toBe(languages.length)
  })
})

function makeSut(opts: { languageService?: LanguageService } = {}) {
  return componentTestSetup(LanguagesSectionComponent, {
    imports: [
      CardGridComponent,
      LanguagesSectionComponent,
      MockComponents(SectionTitleComponent, LanguageComponent),
    ],
    providers: [
      opts.languageService
        ? MockProvider(LANGUAGE_SERVICE, opts.languageService)
        : [],
    ],
  })
}
