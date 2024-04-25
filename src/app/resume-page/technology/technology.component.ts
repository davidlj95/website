import { Component, Input } from '@angular/core'
import { NgIf, NgOptimizedImage } from '@angular/common'
import { TechnologyItem } from './technology-item'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'

@Component({
  selector: 'app-technology',
  standalone: true,
  imports: [NgIf, NgOptimizedImage],
  templateUrl: './technology.component.html',
  styleUrl: './technology.component.scss',
})
export class TechnologyComponent {
  @Input({ required: true }) public set item(item: TechnologyItem) {
    this._item = item
    this._icon = item.icon
      ? {
          color: item.icon.color,
          path: this._sanitizer.bypassSecurityTrustResourceUrl(item.icon.path),
        }
      : undefined
  }
  protected _item!: TechnologyItem
  protected _icon?: { color: string; path: SafeResourceUrl }

  constructor(protected readonly _sanitizer: DomSanitizer) {}
}
