import { Directive, ElementRef, inject } from '@angular/core'

@Directive({
  selector: '[appMaterialSymbol]',
})
export class MaterialSymbolDirective {
  constructor() {
    const elRef = inject<ElementRef<Element>>(ElementRef)

    elRef.nativeElement.classList.add(MATERIAL_SYMBOLS_CLASS)
  }
}

// Keep in sync with Material Symbols sass
/** @visibleForTesting */
export const MATERIAL_SYMBOLS_CLASS = 'material-symbols-outlined'
