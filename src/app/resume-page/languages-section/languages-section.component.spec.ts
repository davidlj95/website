import { LanguagesSectionComponent } from './languages-section.component'
import { byComponent } from '@/test/helpers/component-query-predicates'
import { shouldContainComponent } from '@/test/helpers/component-testers'
import { SectionTitleComponent } from '../section-title/section-title.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { MockComponents, MockProvider } from 'ng-mocks'
import { makeLanguageItem } from './language-item/__tests__/make-language-item'
import { GET_LANGUAGE_ITEMS, GetLanguageItems } from './get-language-items'
import { LanguageItemComponent } from './language-item/language-item.component'
import { CardGridComponent } from '../card-grid/card-grid.component'

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
      byComponent(LanguageItemComponent),
    )

    expect(itemElements.length).toBe(languageItems.length)
  })

  shouldContainComponent(() => makeSut()[0], SectionTitleComponent)
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
