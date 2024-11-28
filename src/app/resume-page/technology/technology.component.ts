import { Component, computed, Inject, input } from '@angular/core'
import { TechnologyItem } from './technology-item'
import { SimpleIconComponent } from '@/common/simple-icon/simple-icon.component'
import {
  GET_TECHNOLOGY_ICON_FROM_SLUG,
  GetTechnologyIconFromSlug,
} from './get-technology-icon-from-slug'
import {
  GET_TECHNOLOGY_DISPLAY_NAME_FROM_SLUG,
  GetTechnologyDisplayNameFromSlug,
} from './get-technology-display-name-from-slug'
import { SimpleIcon } from '@/common/simple-icon/simple-icon'

@Component({
  selector: 'app-technology',
  imports: [SimpleIconComponent],
  templateUrl: './technology.component.html',
  styleUrl: './technology.component.scss',
})
export class TechnologyComponent {
  readonly item = input.required<TechnologyItem>()

  protected readonly _displayName = computed<string>(() =>
    this._getTechnologyDisplayNameFromSlug(this.item().slug),
  )
  protected readonly _icon = computed<SimpleIcon | undefined>(() =>
    this._getTechnologyIconFromSlug(this.item().slug),
  )

  constructor(
    @Inject(GET_TECHNOLOGY_ICON_FROM_SLUG)
    private readonly _getTechnologyIconFromSlug: GetTechnologyIconFromSlug,
    @Inject(GET_TECHNOLOGY_DISPLAY_NAME_FROM_SLUG)
    private readonly _getTechnologyDisplayNameFromSlug: GetTechnologyDisplayNameFromSlug,
  ) {}
}
