import { ComponentFixture } from '@angular/core/testing'

import { ProfileDescriptionLineComponent } from './profile-description-line.component'
import { MATERIAL_SYMBOLS_SELECTOR } from '@/test/helpers/material-symbols'
import { By } from '@angular/platform-browser'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { DescriptionLine } from '@/data/metadata'
import { ATTRIBUTE_ARIA_HIDDEN } from '@/test/helpers/aria'
import { textContent } from '@/test/helpers/text-content'
import { innerHtml } from '@/test/helpers/inner-html'

describe('ProfileDescriptionLineComponent', () => {
  let component: ProfileDescriptionLineComponent
  let fixture: ComponentFixture<ProfileDescriptionLineComponent>

  it('should create', () => {
    ;[fixture, component] = makeSut()

    expect(component).toBeTruthy()
  })

  describe('when line has no data', () => {
    const DUMMY_LINE_NO_DATA = new DescriptionLine()

    beforeEach(() => {
      ;[fixture, component] = makeSut()
      component.line = DUMMY_LINE_NO_DATA
      fixture.detectChanges()
    })

    it('should be empty', () => {
      expect(textContent(fixture.debugElement)).toHaveSize(0)
    })
  })

  describe('when line has data', () => {
    const DUMMY_LINE = DescriptionLine.fromData(
      {
        symbol: 'symbol',
        html: '<span>Content</span>',
      },
      [new DescriptionLine()],
    )

    beforeEach(() => {
      ;[fixture, component] = makeSut()
      component.line = DUMMY_LINE
      fixture.detectChanges()
    })

    it('should display symbol', () => {
      const materialSymbolSpan = fixture.debugElement.query(
        MATERIAL_SYMBOLS_SELECTOR,
      )

      expect(textContent(materialSymbolSpan))
        .withContext('symbol')
        .toEqual(DUMMY_LINE.data!.symbol)

      expect(materialSymbolSpan.attributes[ATTRIBUTE_ARIA_HIDDEN])
        .withContext('symbol is hidden from screen readers')
        .toBe(true.toString())
    })

    it('should display HTML content', () => {
      const htmlSpan = fixture.debugElement.query(By.css('.content'))

      expect(innerHtml(htmlSpan)).toEqual(DUMMY_LINE.data!.html)
    })
  })
})

function makeSut() {
  return componentTestSetup(ProfileDescriptionLineComponent)
}
