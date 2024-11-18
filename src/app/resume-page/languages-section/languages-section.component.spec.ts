import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LanguagesSectionComponent } from './languages-section.component'
import { byComponent } from '@/test/helpers/component-query-predicates'
import { shouldContainComponent } from '@/test/helpers/component-testers'
import { SectionTitleComponent } from '../section-title/section-title.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { NgFor } from '@angular/common'
import { MockComponents, MockProvider } from 'ng-mocks'
import { makeLanguageItem } from './language-item/__tests__/make-language-item'
import { GET_LANGUAGE_ITEMS, GetLanguageItems } from './get-language-items'
import { LanguageItemComponent } from './language-item/language-item.component'

describe('LanguagesSectionComponent', () => {
  let component: LanguagesSectionComponent
  let fixture: ComponentFixture<LanguagesSectionComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguagesSectionComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(LanguagesSectionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display all languages', () => {
    const languageItems = [makeLanguageItem(), makeLanguageItem()]
    const getLanguageItems = jasmine
      .createSpy<GetLanguageItems>()
      .and.returnValue(languageItems)

    ;[fixture, component] = makeSut({ getLanguageItems })
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
      LanguagesSectionComponent,
      NgFor,
      MockComponents(SectionTitleComponent, LanguageItemComponent),
    ],
    providers: [
      opts.getLanguageItems
        ? MockProvider(GET_LANGUAGE_ITEMS, opts.getLanguageItems)
        : [],
    ],
  })
}
