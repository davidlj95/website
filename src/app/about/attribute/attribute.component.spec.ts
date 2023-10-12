import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AttributeComponent } from './attribute.component'
import { MATERIAL_SYMBOLS_SELECTOR } from '../../../test/helpers/material-symbols'
import { By } from '@angular/platform-browser'

describe('AttributeComponent', () => {
  let component: AttributeComponent
  let fixture: ComponentFixture<AttributeComponent>
  const symbol = 'some symbol'
  const tooltipText = 'some tooltip text'
  const id = 'some-attribute-id'

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttributeComponent],
    })
    fixture = TestBed.createComponent(AttributeComponent)
    component = fixture.componentInstance

    component.symbol = symbol
    component.tooltipText = tooltipText
    component.id = id

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should include the given symbol', () => {
    const iconElement = fixture.debugElement.query(MATERIAL_SYMBOLS_SELECTOR)
    expect(iconElement).toBeTruthy()
    expect(iconElement.nativeElement.textContent.trim()).toEqual(symbol)
  })

  it('should include tooltip text', () => {
    const tooltipElement = fixture.debugElement.query(
      By.css("[role='tooltip']"),
    )
    expect(tooltipElement).toBeTruthy()
    expect(tooltipElement.nativeElement.textContent.trim()).toEqual(tooltipText)
  })

  it('should be ARIA accessible: icon is described by tooltip', () => {
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
    const iconElement = fixture.debugElement.query(MATERIAL_SYMBOLS_SELECTOR)
    expect(iconElement).toBeTruthy()
    expect(iconElement.attributes['tabindex']).toEqual('0')
  })
})
