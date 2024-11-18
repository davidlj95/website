import {
  MATERIAL_SYMBOLS_CLASS,
  MaterialSymbolDirective,
} from './material-symbol.directive'
import { TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { Component, Type } from '@angular/core'

describe('MaterialSymbolDirective', () => {
  it('should add the material symbol class to the element', () => {
    const elementTag = 'span'
    const component = makeComponentWithDirective(elementTag)
    TestBed.configureTestingModule({})
    const fixture = TestBed.createComponent(component)
    fixture.detectChanges()

    const childElement = fixture.debugElement.query(By.css(elementTag))

    expect(childElement).toBeTruthy()
    expect(childElement.classes[MATERIAL_SYMBOLS_CLASS]).toBeTrue()
  })
})

function makeComponentWithDirective(elementTag: string): Type<unknown> {
  @Component({
    template: `<${elementTag} appMaterialSymbol></${elementTag}>`,
    standalone: true,
    imports: [MaterialSymbolDirective],
  })
  class MaterialSymbolComponent {}
  return MaterialSymbolComponent
}
