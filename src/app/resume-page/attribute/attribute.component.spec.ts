import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AttributeComponent } from './attribute.component'
import { MATERIAL_SYMBOLS_SELECTOR } from '@test/helpers/material-symbols'
import { By } from '@angular/platform-browser'
import { shouldProjectContent } from '@test/helpers/component-testers'

describe('AttributeComponent', () => {
  const symbol = 'some symbol'
  const id = 'some-attribute-id'

  function makeSut(): [
    ComponentFixture<AttributeComponent>,
    AttributeComponent,
  ] {
    TestBed.configureTestingModule({})
    const fixture = TestBed.createComponent(AttributeComponent)
    const component = fixture.componentInstance

    component.symbol = symbol
    component.id = id

    fixture.detectChanges()

    return [fixture, component]
  }

  it('should create', () => {
    const [component] = makeSut()

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

    const tooltipId = `${id}-tooltip`
    const iconElement = fixture.debugElement.query(MATERIAL_SYMBOLS_SELECTOR)
    expect(iconElement).toBeTruthy()
    expect(iconElement.attributes['aria-describedby']).toEqual(tooltipId)

    const tooltipElement = fixture.debugElement.query(
      By.css("[role='tooltip']"),
    )
    expect(tooltipElement).toBeTruthy()
    expect(tooltipElement.attributes['id']).toEqual(tooltipId)
  })

  it('should be ARIA accessible: icon is included in tab sequence', () => {
    const [fixture] = makeSut()

    const iconElement = fixture.debugElement.query(MATERIAL_SYMBOLS_SELECTOR)
    expect(iconElement).toBeTruthy()
    expect(iconElement.attributes['tabindex']).toEqual('0')
  })

  shouldProjectContent(AttributeComponent, By.css("[role='tooltip']"))
})
