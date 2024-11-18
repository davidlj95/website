import { ATTRIBUTE_ID_PREFIX, AttributeComponent } from './attribute.component'
import { MATERIAL_SYMBOLS_SELECTOR } from '@/test/helpers/material-symbols'
import { By } from '@angular/platform-browser'
import { shouldProjectContent } from '@/test/helpers/component-testers'
import { componentTestSetup } from '@/test/helpers/component-test-setup'

describe('AttributeComponent', () => {
  const symbol = 'some symbol'

  function makeSut() {
    const [fixture, component] = componentTestSetup(AttributeComponent)
    component.symbol = symbol
    fixture.detectChanges()
    return [fixture, component] as const
  }

  it('should create', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, component] = makeSut()

    expect(component).toBeTruthy()
  })

  it('should include the given symbol', () => {
    const [fixture] = makeSut()

    const iconElement = fixture.debugElement.query(MATERIAL_SYMBOLS_SELECTOR)

    expect(iconElement).toBeTruthy()
    expect(iconElement.nativeElement.textContent.trim()).toEqual(symbol)
  })

  it('should be ARIA accessible: icon is described by tooltip', () => {
    const [fixture] = makeSut()

    const tooltipElement = fixture.debugElement.query(
      By.css("[role='tooltip']"),
    )

    expect(tooltipElement).toBeTruthy()
    const tooltipId = tooltipElement.attributes['id']

    expect(tooltipId).toMatch(`^${ATTRIBUTE_ID_PREFIX}`)

    const iconElement = fixture.debugElement.query(MATERIAL_SYMBOLS_SELECTOR)

    expect(iconElement).toBeTruthy()
    expect(iconElement.attributes['aria-describedby']).toEqual(tooltipId)
  })

  it('should be ARIA accessible: icon is included in tab sequence', () => {
    const [fixture] = makeSut()

    const iconElement = fixture.debugElement.query(MATERIAL_SYMBOLS_SELECTOR)

    expect(iconElement).toBeTruthy()
    expect(iconElement.attributes['tabindex']).toEqual('0')
  })

  shouldProjectContent(AttributeComponent, By.css("[role='tooltip']"))
})
