import { Component } from '@angular/core'
import { NgOptimizedImage } from '@angular/common'
import { ContentPageComponent } from '@/common/content-page/content-page.component'
import { CardGiftcard } from '@/data/material-symbols'
import { MaterialSymbolDirective } from '@/common/material-symbol.directive'

@Component({
  imports: [NgOptimizedImage, ContentPageComponent, MaterialSymbolDirective],
  templateUrl: './gifts-page.component.html',
})
export class GiftsPageComponent {
  protected readonly _materialSymbols = { CardGiftcard }
}
