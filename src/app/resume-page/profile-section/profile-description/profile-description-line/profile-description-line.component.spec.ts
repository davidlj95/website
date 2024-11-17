import { ComponentFixture } from '@angular/core/testing'

import { ProfileDescriptionLineComponent } from './profile-description-line.component'
import { MATERIAL_SYMBOLS_SELECTOR } from '@/test/helpers/material-symbols'
import { By } from '@angular/platform-browser'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { DescriptionLine } from '@/data/metadata'
import { ATTRIBUTE_ARIA_HIDDEN } from '@/test/helpers/aria'

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
      expect(fixture.nativeElement.innerText.trim()).toHaveSize(0)
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
      expect(materialSymbolSpan.nativeElement.textContent)
        .withContext('symbol')
        .toEqual(DUMMY_LINE.data!.symbol)
      expect(materialSymbolSpan.attributes[ATTRIBUTE_ARIA_HIDDEN])
        .withContext('symbol is hidden from screen readers')
        .toBe(true.toString())
    })

    it('should display HTML content', () => {
      const htmlSpan = fixture.debugElement.query(By.css('.content'))
      expect(htmlSpan.nativeElement.innerHTML)
        .withContext('html')
        .toEqual(DUMMY_LINE.data!.html)
    })
  })
})

function makeSut() {
  return componentTestSetup(ProfileDescriptionLineComponent)
}
