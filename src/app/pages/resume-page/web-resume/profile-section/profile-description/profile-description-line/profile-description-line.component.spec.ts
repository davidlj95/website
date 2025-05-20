import { ComponentFixture } from '@angular/core/testing'

import { ProfileDescriptionLineComponent } from './profile-description-line.component'
import { MATERIAL_SYMBOLS_SELECTOR } from '@/test/helpers/material-symbols'
import { By } from '@angular/platform-browser'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { DescriptionLineData } from '@/data/metadata'
import { ATTRIBUTE_ARIA_HIDDEN } from '@/test/helpers/aria'
import { textContent } from '@/test/helpers/text-content'
import { innerHtml } from '@/test/helpers/inner-html'
import { setFixtureInputsAndDetectChanges } from '@/test/helpers/set-fixture-inputs'

describe('ProfileDescriptionLineComponent', () => {
  let component: ProfileDescriptionLineComponent
  let fixture: ComponentFixture<ProfileDescriptionLineComponent>

  beforeEach(() => {
    ;[fixture, component] = makeSut({ data: DUMMY_LINE_DATA })
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display symbol', () => {
    const materialSymbolSpan = fixture.debugElement.query(
      MATERIAL_SYMBOLS_SELECTOR,
    )

    expect(textContent(materialSymbolSpan))
      .withContext('symbol')
      .toEqual(DUMMY_LINE_DATA.symbol)

    expect(materialSymbolSpan.attributes[ATTRIBUTE_ARIA_HIDDEN])
      .withContext('symbol is hidden from screen readers')
      .toBe(true.toString())
  })

  it('should display HTML content', () => {
    const htmlSpan = fixture.debugElement.query(By.css('.content'))

    expect(innerHtml(htmlSpan)).toEqual(DUMMY_LINE_DATA.html)
  })
})

function makeSut(opts: { data?: DescriptionLineData } = {}) {
  const [fixture, component] = componentTestSetup(
    ProfileDescriptionLineComponent,
  )
  setFixtureInputsAndDetectChanges(fixture, {
    data: opts.data ?? DUMMY_LINE_DATA,
  })
  return [fixture, component] as const
}

const DUMMY_LINE_DATA = new DescriptionLineData({
  symbol: 'symbol',
  html: '<span>Content</span>',
})
