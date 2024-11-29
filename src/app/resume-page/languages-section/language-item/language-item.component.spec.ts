import { ComponentFixture } from '@angular/core/testing'

import { LanguageItemComponent } from './language-item.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { MockComponents } from 'ng-mocks'
import { CardComponent } from '../../card/card.component'
import { CardHeaderTitleComponent } from '../../card/card-header/card-header-title/card-header-title.component'
import { CardHeaderComponent } from '../../card/card-header/card-header.component'
import { makeLanguageItem } from './__tests__/make-language-item'
import { LanguageItem } from './language-item'
import { byTestId } from '@/test/helpers/test-id'
import { LanguageTagComponent } from './language-tag/language-tag.component'
import { CardHeaderTextsComponent } from '../../card/card-header/card-header-texts/card-header-texts.component'
import { CardHeaderSubtitleComponent } from '../../card/card-header/card-header-subtitle/card-header-subtitle.component'
import { TestIdDirective } from '@/common/test-id.directive'
import { textContent } from '@/test/helpers/text-content'
import { setFixtureInputsAndDetectChanges } from '@/test/helpers/set-fixture-inputs'
import { By } from '@angular/platform-browser'

describe('LanguageItemComponent', () => {
  let component: LanguageItemComponent
  let fixture: ComponentFixture<LanguageItemComponent>

  beforeEach(() => {
    ;[fixture, component] = makeSut()
  })

  it('should create', () => {
    setLanguageItem(fixture)

    expect(component).toBeTruthy()
  })

  it('should display language name', () => {
    const name = 'Sealandic'

    setLanguageItem(fixture, { name })

    const nameElement = fixture.debugElement.query(byTestId('name'))

    expect(textContent(nameElement)).toEqual(name)
  })

  it('should display fluency', () => {
    const fluency = 'Awesomely speaken'

    setLanguageItem(fixture, { fluency })

    const fluencyElement = fixture.debugElement.query(byTestId('fluency'))

    expect(textContent(fluencyElement)).toEqual(fluency)
  })

  const COMMENT_ELEMENT_SELECTOR = byTestId('comment')

  describe('when comment is defined', () => {
    const comment = 'Lived in Sealand for 2 years'

    beforeEach(() => {
      setLanguageItem(fixture, { comment })
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
      setLanguageItem(fixture, { comment })
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
  return componentTestSetup(LanguageItemComponent, {
    imports: [
      LanguageItemComponent,
      TestIdDirective,
      MockComponents(
        CardComponent,
        CardHeaderComponent,
        CardHeaderTitleComponent,
        CardHeaderTextsComponent,
        CardHeaderSubtitleComponent,
        LanguageTagComponent,
      ),
    ],
  })
}

function setLanguageItem(
  fixture: ComponentFixture<LanguageItemComponent>,
  overrides?: Partial<LanguageItem>,
) {
  setFixtureInputsAndDetectChanges(fixture, {
    item: makeLanguageItem(overrides),
  })
}
