import { LanguagesSectionComponent } from './languages-section.component'
import { SectionTitleComponent } from '../section-title/section-title.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { MockComponents, MockProvider } from 'ng-mocks'
import { makeLanguageItem } from './language-item/__tests__/make-language-item'
import { GET_LANGUAGE_ITEMS, GetLanguageItems } from './get-language-items'
import { LanguageItemComponent } from './language-item/language-item.component'
import { CardGridComponent } from '../card-grid/card-grid.component'
import { By } from '@angular/platform-browser'

describe('LanguagesSectionComponent', () => {
  it('should create', () => {
    const [fixture] = makeSut()

    expect(fixture.componentInstance).toBeTruthy()
  })

  it('should display all languages', () => {
    const languageItems = [makeLanguageItem(), makeLanguageItem()]
    const getLanguageItems = jasmine
      .createSpy<GetLanguageItems>()
      .and.returnValue(languageItems)

    const [fixture] = makeSut({ getLanguageItems })
    fixture.detectChanges()

    const itemElements = fixture.debugElement.queryAll(
      By.directive(LanguageItemComponent),
    )

    expect(itemElements.length).toBe(languageItems.length)
  })
})

function makeSut(opts: { getLanguageItems?: GetLanguageItems } = {}) {
  return componentTestSetup(LanguagesSectionComponent, {
    imports: [
      CardGridComponent,
      LanguagesSectionComponent,
      MockComponents(SectionTitleComponent, LanguageItemComponent),
    ],
    providers: [
      opts.getLanguageItems
        ? MockProvider(GET_LANGUAGE_ITEMS, opts.getLanguageItems)
        : [],
    ],
  })
}
