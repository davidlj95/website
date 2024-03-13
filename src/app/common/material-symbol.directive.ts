import { Directive, ElementRef } from '@angular/core'

@Directive({
  selector: '[appMaterialSymbol]',
  standalone: true,
})
export class MaterialSymbolDirective {
  constructor(private el: ElementRef) {
    ;(this.el.nativeElement as HTMLElement).classList.add(
      MATERIAL_SYMBOLS_CLASS,
    )
  }
}

// Keep in sync with Material Symbols sass
export const MATERIAL_SYMBOLS_CLASS = 'material-symbols-outlined'
