import { ComponentFixture } from '@angular/core/testing'

import { LanguageItemComponent } from './language-item.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { NgIf } from '@angular/common'
import { MockComponents } from 'ng-mocks'
import { CardComponent } from '../../card/card.component'
import { CardHeaderTitleComponent } from '../../card/card-header/card-header-title/card-header-title.component'
import { CardHeaderComponent } from '../../card/card-header/card-header.component'
import { makeLanguageItem } from './__tests__/make-language-item'
import { LanguageItem } from './language-item'
import { byTestId } from '@/test/helpers/test-id'

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
    expect(nameElement.nativeElement.textContent.trim()).toEqual(name)
  })

  it('should display fluency', () => {
    const fluency = 'Awesomely speaken'

    setLanguageItem(fixture, { fluency })

    const fluencyElement = fixture.debugElement.query(byTestId('fluency'))
    expect(fluencyElement.nativeElement.textContent.trim()).toEqual(fluency)
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
      expect(commentElement.nativeElement.textContent.trim()).toEqual(comment)
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
})

function makeSut() {
  return componentTestSetup(LanguageItemComponent, {
    imports: [
      LanguageItemComponent,
      NgIf,
      MockComponents(
        CardComponent,
        CardHeaderComponent,
        CardHeaderTitleComponent,
      ),
    ],
  })
}

function setLanguageItem(
  fixture: ComponentFixture<LanguageItemComponent>,
  overrides?: Partial<LanguageItem>,
) {
  fixture.componentInstance.item = makeLanguageItem(overrides)
  fixture.detectChanges()
}
