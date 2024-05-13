import { Component, Inject, Input } from '@angular/core'
import { NgIf, NgOptimizedImage } from '@angular/common'
import { TechnologyItem } from './technology-item'
import { SimpleIconComponent } from '@/common/simple-icon/simple-icon.component'
import { SimpleIcon } from '@/common/simple-icon/simple-icon'
import {
  GET_TECHNOLOGY_ICON_FROM_SLUG,
  GetTechnologyIconFromSlug,
} from './get-technology-icon-from-slug'

@Component({
  selector: 'app-technology',
  standalone: true,
  imports: [NgIf, NgOptimizedImage, SimpleIconComponent],
  templateUrl: './technology.component.html',
  styleUrl: './technology.component.scss',
})
export class TechnologyComponent {
  @Input({ required: true }) set item(item: TechnologyItem) {
    this._displayName = item.displayName
    this._icon = this.getTechnologyIconFromSlug(item.slug)
  }
  protected _displayName!: string
  protected _icon?: SimpleIcon

  constructor(
    @Inject(GET_TECHNOLOGY_ICON_FROM_SLUG)
    private readonly getTechnologyIconFromSlug: GetTechnologyIconFromSlug,
  ) {}
}
