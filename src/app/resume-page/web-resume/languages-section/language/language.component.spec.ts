import { ComponentFixture } from '@angular/core/testing'

import { LanguageComponent } from './language.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { MockComponents } from 'ng-mocks'
import { CardComponent } from '../../../card/card.component'
import { CardHeaderComponent } from '../../../card/card-header/card-header.component'
import { makeLanguage } from '../../../data/__tests__/make-language'
import { Language } from '../../../data/language'
import { byTestId } from '@/test/helpers/test-id'
import { LanguageTagComponent } from './language-tag/language-tag.component'
import { CardHeaderTextsComponent } from '../../../card/card-header/card-header-texts/card-header-texts.component'
import { TestIdDirective } from '@/common/test-id.directive'
import { textContent } from '@/test/helpers/text-content'
import { setFixtureInputsAndDetectChanges } from '@/test/helpers/set-fixture-inputs'
import { By } from '@angular/platform-browser'

describe('LanguageComponent', () => {
  let component: LanguageComponent
  let fixture: ComponentFixture<LanguageComponent>

  beforeEach(() => {
    ;[fixture, component] = makeSut()
  })

  it('should create', () => {
    setLanguage(fixture)

    expect(component).toBeTruthy()
  })

  it('should display language name', () => {
    const name = 'Sealandic'

    setLanguage(fixture, { name })

    const nameElement = fixture.debugElement.query(byTestId('name'))

    expect(textContent(nameElement)).toEqual(name)
  })

  it('should display fluency', () => {
    const fluency = 'Awesomely speaken'

    setLanguage(fixture, { fluency })

    const fluencyElement = fixture.debugElement.query(byTestId('fluency'))

    expect(textContent(fluencyElement)).toEqual(fluency)
  })

  const COMMENT_ELEMENT_SELECTOR = byTestId('comment')

  describe('when comment is defined', () => {
    const comment = 'Lived in Sealand for 2 years'

    beforeEach(() => {
      setLanguage(fixture, { comment })
    })

    it('should display comment', () => {
      const commentElement = fixture.debugElement.query(
        COMMENT_ELEMENT_SELECTOR,
      )

      expect(textContent(commentElement)).toEqual(comment)
    })
  })

  describe('when comment is not defined', () => {
    const comment = undefined

    beforeEach(() => {
      setLanguage(fixture, { comment })
    })

    it('should not display comment element', () => {
      const commentElement = fixture.debugElement.query(
        COMMENT_ELEMENT_SELECTOR,
      )

      expect(commentElement).toBeNull()
    })
  })

  it('should display tag', () => {
    const tagElement = fixture.debugElement.query(
      By.directive(LanguageTagComponent),
    )

    expect(tagElement).not.toBeNull()
  })
})

function makeSut() {
  return componentTestSetup(LanguageComponent, {
    imports: [
      LanguageComponent,
      TestIdDirective,
      MockComponents(
        CardComponent,
        CardHeaderComponent,
        CardHeaderTextsComponent,
        LanguageTagComponent,
      ),
    ],
  })
}

function setLanguage(
  fixture: ComponentFixture<LanguageComponent>,
  overrides?: Partial<Language>,
) {
  setFixtureInputsAndDetectChanges(fixture, {
    language: makeLanguage(overrides),
  })
}
