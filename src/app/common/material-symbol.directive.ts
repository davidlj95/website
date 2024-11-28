import { Directive, ElementRef } from '@angular/core'

@Directive({
  selector: '[appMaterialSymbol]',
})
export class MaterialSymbolDirective {
  constructor(elRef: ElementRef<Element>) {
    elRef.nativeElement.classList.add(MATERIAL_SYMBOLS_CLASS)
  }
}

// Keep in sync with Material Symbols sass
export const MATERIAL_SYMBOLS_CLASS = 'material-symbols-outlined'
