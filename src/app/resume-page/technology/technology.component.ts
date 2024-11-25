import { Component, Inject, Input } from '@angular/core'
import { TechnologyItem } from './technology-item'
import { SimpleIconComponent } from '@/common/simple-icon/simple-icon.component'
import { SimpleIcon } from '@/common/simple-icon/simple-icon'
import {
  GET_TECHNOLOGY_ICON_FROM_SLUG,
  GetTechnologyIconFromSlug,
} from './get-technology-icon-from-slug'
import {
  GET_TECHNOLOGY_DISPLAY_NAME_FROM_SLUG,
  GetTechnologyDisplayNameFromSlug,
} from './get-technology-display-name-from-slug'

@Component({
  selector: 'app-technology',
  imports: [SimpleIconComponent],
  templateUrl: './technology.component.html',
  styleUrl: './technology.component.scss',
})
export class TechnologyComponent {
  @Input({ required: true }) set item(item: TechnologyItem) {
    this._displayName = this.getTechnologyDisplayNameFromSlug(item.slug)
    this._icon = this.getTechnologyIconFromSlug(item.slug)
  }

  protected _displayName!: string
  protected _icon?: SimpleIcon

  constructor(
    @Inject(GET_TECHNOLOGY_ICON_FROM_SLUG)
    private readonly getTechnologyIconFromSlug: GetTechnologyIconFromSlug,
    @Inject(GET_TECHNOLOGY_DISPLAY_NAME_FROM_SLUG)
    private readonly getTechnologyDisplayNameFromSlug: GetTechnologyDisplayNameFromSlug,
  ) {}
}
